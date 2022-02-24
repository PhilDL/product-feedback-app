import Head from "next/head";
import React, { useMemo } from "react";
import ApplicationLogo from "../components/UI/ApplicationLogo";
import FeedbacksListHeader from "../components/FeedbacksListHeader";
import FeedbackSWRComponent from "../components/FeedbackSWRComponent";
import NoFeedback from "../components/NoFeedback";
import RoadmapMenu from "../components/RoadmapMenu";
import TagsCloud from "../components/TagsCloud";
import { getAllFeedbacks } from "../lib/client";
import { supabaseClient } from "../lib/client";
import useSWR, { SWRConfig } from "swr";
import type { GetStaticProps } from "next";
import type {
  FeedbackModel,
  CategoryModel,
  FeedbackStatusAggregate,
} from "../types/models";

export interface SuggestionsContentProps {
  categories: CategoryModel[];
}

const fetcher = async (input: RequestInfo) => {
  const res: Response = await fetch(input);
  return await res.json();
};

const SuggestionsContent: React.FC<SuggestionsContentProps> = ({
  categories,
}) => {
  const { data: feedbacks } = useSWR<FeedbackModel[]>(
    `/api/feedbacks`,
    fetcher,
    { revalidateOnMount: false, revalidateOnFocus: false }
  );
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
    if (feedbacksSort === "most-upvotes") {
      return sortedFeedbacks?.sort(
        (a, b) => b.upvotes.length - a.upvotes.length
      );
    } else if (feedbacksSort === "most-comments") {
      return sortedFeedbacks?.sort(
        (a, b) => b.comments.length - a.comments.length
      );
    } else if (feedbacksSort === "least-upvotes") {
      return sortedFeedbacks?.sort(
        (a, b) => a.upvotes.length - b.upvotes.length
      );
    } else if (feedbacksSort === "least-comments") {
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
    console.log(sort);
    setFeedbacksSort(sort);
  };

  return (
    <>
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
        {(sortedFeedbacks?.length || 0) > 0 ? (
          <div className="flex flex-col gap-4">
            {sortedFeedbacks &&
              sortedFeedbacks.map((feedback) => (
                <FeedbackSWRComponent
                  key={feedback.slug}
                  slug={feedback.slug}
                />
              ))}
          </div>
        ) : (
          <NoFeedback />
        )}
      </main>
    </>
  );
};

export interface SuggestionsProps {
  categories: CategoryModel[];
  feedbacks: FeedbackModel[];
  feedbackStatuses: FeedbackStatusAggregate[];
  fallback: any;
}

const Suggestions: React.FC<SuggestionsProps> = ({
  categories,
  feedbacks,
  feedbackStatuses,
  fallback,
}) => {
  return (
    <SWRConfig value={{ fallback }}>
      <div className="flex min-h-screen py-2 container mx-auto gap-7">
        <Head>
          <title>Feedback App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <SuggestionsContent categories={categories} />
      </div>
    </SWRConfig>
  );
};

export default Suggestions;

export const getStaticProps: GetStaticProps = async (context) => {
  const feedbackStatuses = [
    { name: "Planned", key: "planned", count: 0, color: "#F49F85" },
    { name: "In-Progress", key: "in-progress", count: 0, color: "#AD1FEA" },
    { name: "Live", key: "live", count: 0, color: "#62BCFA" },
  ];

  const { data: feedbacks, error: feedbacksError } = await getAllFeedbacks();
  const fallback: { [key: string]: any } = { "/api/feedbacks": feedbacks };
  if (feedbacks) {
    feedbacks?.sort((a, b) => b.upvotes.length - a.upvotes.length);
    for (const feedback of feedbacks) {
      let key = `/api/feedback/${feedback.slug}`;
      fallback[key] = feedback;
      const { status } = feedback;
      const statusIndex = feedbackStatuses.findIndex(
        (statusItem) => statusItem.key === status
      );
      if (statusIndex !== -1) {
        feedbackStatuses[statusIndex].count++;
      }
    }
  }

  const { data: categories, error: categoriesError } = await supabaseClient
    .from("categories")
    .select("*")
    .order("id");

  return {
    props: {
      feedbacks: feedbacks,
      categories: categories,
      feedbackStatuses: feedbackStatuses,
      fallback: fallback,
    },
    revalidate: 60, // seconds
  };
};
