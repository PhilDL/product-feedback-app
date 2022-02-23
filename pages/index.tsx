import Head from "next/head";
import React from "react";
import ApplicationLogo from "../components/UI/ApplicationLogo";
import FeedbacksListHeader from "../components/FeedbacksListHeader";
import FeedbacksList from "../components/FeedbacksList";
import RoadmapMenu from "../components/RoadmapMenu";
import TagsCloud from "../components/TagsCloud";
import Button from "../components/UI/Button";
import { supabaseClient } from "../lib/client";
import type { GetStaticProps } from "next";
import type {
  FeedbackModel,
  CategoryModel,
  FeedbackStatusAggregate,
} from "../types/models";

export interface SuggestionsProps {
  categories: CategoryModel[];
  feedbacks: FeedbackModel[];
  feedbackStatuses: FeedbackStatusAggregate[];
}

const Suggestions: React.FC<SuggestionsProps> = ({
  categories,
  feedbacks,
  feedbackStatuses,
}) => {
  return (
    <div className="flex min-h-screen py-2 container mx-auto gap-7">
      <Head>
        <title>Feedback App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav className="flex flex-col gap-6 max-w-xs">
        <ApplicationLogo />
        <TagsCloud tags={categories} />
        <RoadmapMenu feedbackStatuses={feedbackStatuses} />
      </nav>
      <main className="flex flex-col w-full gap-7">
        <FeedbacksListHeader feedbackCount={feedbacks.length} />
        <FeedbacksList feedbacks={feedbacks} userUpvotedFeedbacksIds={[]} />
      </main>
    </div>
  );
};

export default Suggestions;

export const getStaticProps: GetStaticProps = async (context) => {
  const feedbackStatuses = [
    { name: "Planned", key: "planned", count: 0, color: "#F49F85" },
    { name: "In-Progress", key: "in-progress", count: 0, color: "#AD1FEA" },
    { name: "Live", key: "live", count: 0, color: "#62BCFA" },
  ];

  const { data: feedbacks, error: feedbacksError } = await supabaseClient
    .from("feedbacks")
    .select(
      `
    *, 
    category:categories (id, name, slug),
    comments!comments_feedback_id_fkey (id, content),
    user:profiles!feedbacks_user_id_fkey (id, username, avatar_url, full_name),
    upvotes (user_id),
    upvotesCount:upvotes(count),
    commentsCount:comments!comments_feedback_id_fkey(count)
    `
    )
    .order("id");
  if (feedbacks) {
    for (const feedback of feedbacks) {
      console.log(feedback);
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

  // Promise.allSettled([getUserDetails(), getSubscription()]).then(
  //   (results) => {
  //     const userDetailsPromise = results[0];
  //     const subscriptionPromise = results[1];

  //     console.log("subscription", subscriptionPromise);
  //     if (userDetailsPromise.status === "fulfilled")
  //       setUserDetails(userDetailsPromise.value.data);

  //     if (subscriptionPromise.status === "fulfilled")
  //       setSubscription(subscriptionPromise.value.data);

  //     setUserLoaded(true);
  //   }
  // );

  return {
    props: {
      feedbacks: feedbacks,
      categories: categories,
      feedbackStatuses: feedbackStatuses,
    },
    revalidate: 60, // seconds
  };
};
