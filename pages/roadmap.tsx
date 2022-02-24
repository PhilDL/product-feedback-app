import Head from "next/head";
import React, { useMemo } from "react";
import RoadmapFeedbacksList from "../components/RoadmapFeedbacksList";
import ButtonLink from "../components/UI/ButtonLink";
import GoBackLink from "../components/UI/GoBackLink";
import Link from "next/link";
import { getAllFeedbacks, deleteUpvote, addUpvote } from "../lib/client";
import { supabaseClient } from "../lib/client";
import useSWR, { useSWRConfig } from "swr";
import type { GetStaticProps } from "next";
import type { FeedbackModel, CategoryModel } from "../types/models";
import { useUser } from "../utils/useUser";

export interface RoadmapProps {
  categories: CategoryModel[];
  initialFeedbacks: FeedbackModel[];
}

// const useStaleWhileRevalidatedFeedback = (initFeedback: FeedbackModel) => {
//   return useSWR(`/api/feedback/${initFeedback.slug}`, {
//     fallbackData: initFeedback,
//   });
// };

export interface FeedbackStatusAggregate {
  name: string;
  key: string;
  count: number;
  color: string;
  feedbacks: FeedbackModel[];
  description: string;
}

const Roadmap: React.FC<RoadmapProps> = ({ categories, initialFeedbacks }) => {
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

  const feedbackStatuses: FeedbackStatusAggregate[] = [
    {
      name: "Planned",
      key: "planned",
      count: 0,
      color: "#F49F85",
      feedbacks: [],
      description: "Ideas prioritized for research",
    },
    {
      name: "In-Progress",
      key: "in-progress",
      count: 0,
      color: "#AD1FEA",
      feedbacks: [],
      description: "Currently being developed",
    },
    {
      name: "Live",
      key: "live",
      count: 0,
      color: "#62BCFA",
      feedbacks: [],
      description: "Released features",
    },
  ];
  if (feedbacks) {
    for (const feedback of feedbacks) {
      const { status } = feedback;
      const statusIndex = feedbackStatuses.findIndex(
        (statusItem) => statusItem.key === status
      );
      if (statusIndex !== -1) {
        feedbackStatuses[statusIndex].count++;
        feedbackStatuses[statusIndex].feedbacks.push(feedback);
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
    <div className="flex flex-col min-h-screen py-2 container mx-auto gap-7">
      <Head>
        <title>Homepage | Product Feedback App</title>
        <meta
          name="description"
          content="Product Feedback App built with NextJS, Supabase, TailwindCSS 3, SWR"
        />
      </Head>
      <nav className="flex flex-row gap-4 rounded py-6 px-8 justify-between items-center bg-blue-dark text-white">
        <div>
          <Link href="/" passHref>
            <GoBackLink theme="dark" />
          </Link>
          <h1 className="text-2xl font-bold">Roadmap</h1>
        </div>
        <Link href="/new" passHref>
          <ButtonLink role="primary" className="ml-auto">
            + Add Feedback
          </ButtonLink>
        </Link>
      </nav>
      <main className="flex  w-full gap-7">
        {feedbackStatuses.map((feedbackStatus) => (
          <div key={feedbackStatus.key}>
            <h2 className="text-gray-700 font-bold text-lg">
              {feedbackStatus.name} ({feedbackStatus.count})
            </h2>
            <p className="text-gray-500 mb-6">{feedbackStatus.description}</p>
            <RoadmapFeedbacksList
              feedbacks={feedbackStatus.feedbacks || []}
              upvoteCallBack={onChangeUpvoteHandler}
              statusColor={feedbackStatus.color}
              statusName={feedbackStatus.name}
            />
          </div>
        ))}
      </main>
    </div>
  );
};

export default Roadmap;

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
