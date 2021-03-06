import React, { useMemo, useState } from "react";
import Head from "next/head";
import useSWR from "swr";
import { ApplicationLogo } from "../components/UI";
import {
  FeedbacksListHeader,
  FeedbacksList,
  RoadmapMenu,
  TagsCloud,
  MobileMenu,
} from "../components";
import { supabaseClient, getAllFeedbacks } from "../lib/client";
import { useUpvoteChange } from "../utils/useUpvotes";
import type { GetStaticProps } from "next";
import type { FeedbackModel, CategoryModel } from "../types/models";

export interface SuggestionsProps {
  categories: CategoryModel[];
  initialFeedbacks: FeedbackModel[];
}

const Suggestions: React.FC<SuggestionsProps> = ({
  categories,
  initialFeedbacks,
}) => {
  const { data: feedbacks } = useSWR<FeedbackModel[]>(`/api/feedbacks`, {
    fallbackData: initialFeedbacks,
  });
  const [feedbacksSort, setFeedbacksSort] = useState<string>("most-upvotes");
  const [selectedCategoryId, setSelectedCategoryId] =
    useState<number | null>(null);
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);
  const { onChangeUpvoteHandler } = useUpvoteChange();

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

  return (
    <div className="flex flex-col sm:flex-col lg:flex-row min-h-screen sm:py-2 container mx-auto sm:gap-7">
      <Head>
        <title>Homepage | Product Feedback App</title>
        <meta
          name="description"
          content="Product Feedback App built with NextJS, Supabase, TailwindCSS 3, SWR"
        />
      </Head>
      <nav className="sm:flex lg:flex-col sm:gap-6 lg:max-w-xs">
        <ApplicationLogo
          className="sm:flex-1 lg:flex-grow-0"
          onMobileMenuClick={() => setShowMobileMenu(true)}
          onMobileMenuCloseClick={() => setShowMobileMenu(false)}
          mobileMenuVisible={showMobileMenu}
        />
        <TagsCloud
          tags={categories}
          onChangeCategory={setSelectedCategoryId}
          selectedCategoryId={selectedCategoryId}
          className="hidden sm:flex sm:flex-1 lg:flex-grow-0"
        />
        <RoadmapMenu
          feedbackStatuses={feedbackStatuses}
          className="hidden sm:flex sm:flex-1 lg:flex-grow-0"
        />
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
      <MobileMenu
        isOpen={showMobileMenu}
        onDismiss={() => setShowMobileMenu(false)}
        categories={categories}
        onChangeCategory={setSelectedCategoryId}
        selectedCategoryId={selectedCategoryId}
        feedbackStatuses={feedbackStatuses}
      />
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
