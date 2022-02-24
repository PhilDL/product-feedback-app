import Head from "next/head";
import React, { useMemo } from "react";
import ApplicationLogo from "../components/UI/ApplicationLogo";
import FeedbacksListHeader from "../components/FeedbacksListHeader";
import FeedbacksList from "../components/FeedbacksList";
import RoadmapMenu from "../components/RoadmapMenu";
import TagsCloud from "../components/TagsCloud";
import { getAllFeedbacks, deleteUpvote, addUpvote } from "../lib/client";
import { supabaseClient } from "../lib/client";
import useSWR, { useSWRConfig } from "swr";
import type { GetStaticProps } from "next";
import type { FeedbackModel, CategoryModel } from "../types/models";
import { useUser } from "../utils/useUser";

export interface SuggestionsProps {
  categories: CategoryModel[];
  initialFeedbacks: FeedbackModel[];
}

// const useStaleWhileRevalidatedFeedback = (initFeedback: FeedbackModel) => {
//   return useSWR(`/api/feedback/${initFeedback.slug}`, {
//     fallbackData: initFeedback,
//   });
// };

const Suggestions: React.FC<SuggestionsProps> = ({
  categories,
  initialFeedbacks,
}) => {
  const { mutate, cache } = useSWRConfig();
  const { data: feedbacks } = useSWR<FeedbackModel[]>(`/api/feedbacks`, {
    revalidateOnMount: false,
    revalidateOnFocus: false,
    fallbackData: initialFeedbacks,
  });
  const { user } = useUser();
  const [feedbacksSort, setFeedbacksSort] =
    React.useState<string>("most-upvotes");
  const [selectedCategoryId, setSelectedCategoryId] =
    React.useState<number | null>(null);

  const sortedFeedbacks = useMemo(() => {
    let sortedFeedbacks: FeedbackModel[] = feedbacks || [];
    if (selectedCategoryId !== null) {
      sortedFeedbacks = sortedFeedbacks.filter(
        (feedback) => feedback.category.id === selectedCategoryId
      );
    }
    switch (feedbacksSort) {
      case "most-upvotes":
        return sortedFeedbacks?.sort(
          (a, b) => b.upvotes.length - a.upvotes.length
        );
      case "most-comments":
        return sortedFeedbacks?.sort(
          (a, b) => b.comments.length - a.comments.length
        );
      case "least-upvotes":
        return sortedFeedbacks?.sort(
          (a, b) => a.upvotes.length - b.upvotes.length
        );
      case "least-comments":
        return sortedFeedbacks?.sort(
          (a, b) => a.comments.length - b.comments.length
        );
    }
  }, [feedbacks, feedbacksSort, selectedCategoryId]);

  const feedbackStatuses = [
    { name: "Planned", key: "planned", count: 0, color: "#F49F85" },
    { name: "In-Progress", key: "in-progress", count: 0, color: "#AD1FEA" },
    { name: "Live", key: "live", count: 0, color: "#62BCFA" },
  ];
  if (feedbacks) {
    for (const feedback of feedbacks) {
      const { status } = feedback;
      const statusIndex = feedbackStatuses.findIndex(
        (statusItem) => statusItem.key === status
      );
      if (statusIndex !== -1) {
        feedbackStatuses[statusIndex].count++;
      }
    }
  }
  const changeSortHandler = (sort: string) => {
    setFeedbacksSort(sort);
  };

  const onChangeUpvoteHandler = async (
    feedbackSlug: string,
    feedbackId: number,
    oldUpvoteState: boolean
  ) => {
    if (user) {
      if (oldUpvoteState) {
        const { data, error } = await deleteUpvote(feedbackId, user.id);
      } else {
        const { data, error } = await addUpvote(feedbackId, user.id);
      }
      mutate(`/api/feedback/${feedbackSlug}`);
      mutate(`/api/feedbacks`);
    }
  };

  return (
    <div className="flex min-h-screen py-2 container mx-auto gap-7">
      <Head>
        <title>Homepage | Product Feedback App</title>
        <meta
          name="description"
          content="Product Feedback App built with NextJS, Supabase, TailwindCSS 3, SWR"
        />
      </Head>
      <nav className="flex flex-col gap-6 max-w-xs">
        <ApplicationLogo />
        <TagsCloud
          tags={categories}
          onChangeCategory={setSelectedCategoryId}
          selectedCategoryId={selectedCategoryId}
        />
        <RoadmapMenu feedbackStatuses={feedbackStatuses} />
      </nav>
      <main className="flex flex-col w-full gap-7">
        <FeedbacksListHeader
          feedbackCount={feedbacks?.length || 0}
          onChangeSort={changeSortHandler}
        />
        <FeedbacksList
          feedbacks={sortedFeedbacks || []}
          upvoteCallBack={onChangeUpvoteHandler}
        />
      </main>
    </div>
  );
};

export default Suggestions;

export const getStaticProps: GetStaticProps = async (context) => {
  const { data: feedbacks, error: feedbacksError } = await getAllFeedbacks();
  if (feedbacks) {
    feedbacks?.sort((a, b) => b.upvotes.length - a.upvotes.length);
  }

  const { data: categories, error: categoriesError } = await supabaseClient
    .from("categories")
    .select("*")
    .order("id");

  return {
    props: {
      initialFeedbacks: feedbacks,
      categories: categories,
    },
    revalidate: 30, // seconds
  };
};
