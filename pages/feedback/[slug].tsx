import React from "react";
import useSWR, { useSWRConfig } from "swr";
import Head from "next/head";
import Link from "next/link";
import { GoBackLink, ButtonLink } from "../../components/UI";
import { Feedback, CommentsList, AddCommentForm } from "../../components";
import {
  supabaseClient,
  getFeedbackBySlug,
  deleteUpvote,
  addUpvote,
} from "../../lib/client";
import { useUser } from "../../utils/useUser";
import type { FeedbackModel } from "../../types/models";
import type { GetStaticProps } from "next";

export interface FeedbackDetailsProps {
  initFeedback: FeedbackModel;
  slug: string;
}

const FeedbackDetails: React.FC<FeedbackDetailsProps> = ({
  initFeedback,
  slug,
}) => {
  const { mutate } = useSWRConfig();
  const { data: feedback } = useSWR<FeedbackModel>(`/api/feedback/${slug}`, {
    fallbackData: initFeedback,
  });
  const { user } = useUser();
  const comments = feedback?.comments || [];

  const onAddCommentHandler = () => {
    mutate(`/api/feedback/${slug}`);
    mutate("/api/feedbacks");
  };
  const upvoteCallBack = async (
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
      mutate("/api/feedbacks");
    }
  };

  if (!feedback) {
    return <div>ERRROR</div>;
  }
  return (
    <div className="flex flex-col min-h-screen py-2 px-6 md:px-0 container mx-auto gap-7 max-w-3xl justify-center">
      <Head>
        <title>{feedback.title} | Product Feedback App</title>
        <meta name="description" content={feedback.description} />
      </Head>
      <header className="flex justify-between mt-6">
        <Link href="/" passHref>
          <GoBackLink />
        </Link>
        <Link href={`/edit/${feedback.slug}`} passHref>
          <ButtonLink role="secondary">Edit Feedback</ButtonLink>
        </Link>
      </header>
      <main className="flex flex-col w-full gap-7">
        <Feedback
          feedback={feedback}
          upvoteCallBack={upvoteCallBack}
          withHeading={true}
        />
        <CommentsList
          comments={comments || []}
          totalComments={comments?.length || 0}
          onAddComment={onAddCommentHandler}
        />
        <AddCommentForm
          feedbackId={feedback.id}
          onAddComment={onAddCommentHandler}
        />
      </main>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context.params?.slug as string;

  const { data: feedback, error: feedbacksError } = await getFeedbackBySlug(
    slug
  );
  const key = `/api/feedback/${slug}`;
  return {
    props: {
      fallback: {
        [key]: feedback,
      },
      initFeedback: feedback,
      slug: slug,
    },
    revalidate: 30,
  };
};

export const getStaticPaths = async () => {
  const { data: feedbacks, error: feedbacksError } = await supabaseClient
    .from("feedbacks")
    .select(`id, slug`)
    .order("id");
  if (!feedbacks) {
    return { fallback: true };
  }

  return {
    paths: feedbacks.map((feedback) => ({
      params: { slug: feedback.slug },
    })),
    // fallback is required, it is false if all paths are "covered" (static), else it should
    // be true so NextJS can fetch the other pages
    fallback: "blocking",
  };
};

export default FeedbackDetails;
