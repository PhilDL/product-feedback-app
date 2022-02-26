import React from "react";
import Head from "next/head";
import useSWR from "swr";
import RoadmapFeedbacksList from "../components/RoadmapFeedbacksList";
import { ButtonLink, GoBackLink } from "../components/UI";
import Link from "next/link";
import { getAllFeedbacks } from "../lib/client";
import { useUpvoteChange } from "../utils/useUpvotes";
import type { GetStaticProps } from "next";
import type { FeedbackModel } from "../types/models";

export interface RoadmapProps {
  initialFeedbacks: FeedbackModel[];
}

export interface FeedbackStatusAggregate {
  name: string;
  key: string;
  count: number;
  color: string;
  feedbacks: FeedbackModel[];
  description: string;
}

const Roadmap: React.FC<RoadmapProps> = ({ initialFeedbacks }) => {
  const { data: feedbacks } = useSWR<FeedbackModel[]>(`/api/feedbacks`, {
    fallbackData: initialFeedbacks,
  });
  const { onChangeUpvoteHandler } = useUpvoteChange();
  const [selectedStatus, setSelectedStatus] =
    React.useState<string | null>(null);

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

  return (
    <div className="flex flex-col min-h-screen container mx-auto sm:gap-7">
      <Head>
        <title>Homepage | Product Feedback App</title>
        <meta
          name="description"
          content="Product Feedback App built with NextJS, Supabase, TailwindCSS 3, SWR"
        />
      </Head>
      <nav className="flex flex-row gap-4 sm:rounded py-6 px-8 justify-between items-center bg-blue-dark text-white">
        <div>
          <Link href="/" passHref>
            <GoBackLink theme="dark" />
          </Link>
          <h1 className="text-xl sm:text-2xl font-bold">Roadmap</h1>
        </div>
        <Link href="/new-feedback" passHref>
          <ButtonLink role="primary" className="ml-auto">
            + Add Feedback
          </ButtonLink>
        </Link>
      </nav>
      <nav className="flex gap-4 px-6 justify-between border-b-2 border-b-gray-500/20 mb-6 sm:hidden">
        {feedbackStatuses.map((feedbackStatus) => (
          <button
            key={`link-feedback-status-${feedbackStatus.key}`}
            onClick={() => setSelectedStatus(feedbackStatus.key)}
            className={`text-gray-700 text-sm font-bold pt-6 pb-4 w-full ${
              feedbackStatus.key === selectedStatus
                ? "border-b-fushia border-b-4"
                : "border-b-transparent border-b-4 opacity-40"
            }`}
          >
            {feedbackStatus.name} ({feedbackStatus.count})
          </button>
        ))}
      </nav>
      <main className="flex w-full gap-7 flex-col px-6 sm:flex-row sm:px-0">
        {feedbackStatuses.map((feedbackStatus) => (
          <div key={feedbackStatus.key} className="flex-1">
            {(selectedStatus === null ||
              selectedStatus === feedbackStatus.key) && (
              <>
                <h2 className="text-gray-700 font-bold text-lg">
                  {feedbackStatus.name} ({feedbackStatus.count})
                </h2>
                <p className="text-gray-500 mb-6">
                  {feedbackStatus.description}
                </p>

                <RoadmapFeedbacksList
                  feedbacks={feedbackStatus.feedbacks || []}
                  upvoteCallBack={onChangeUpvoteHandler}
                  statusColor={feedbackStatus.color}
                  statusName={feedbackStatus.name}
                />
              </>
            )}
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
  return {
    props: {
      initialFeedbacks: feedbacks,
    },
    revalidate: 30, // seconds
  };
};
