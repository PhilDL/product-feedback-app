import Head from "next/head";
import React from "react";
import Link from "next/link";
import GoBackLink from "../../components/UI/GoBackLink";
import Feedback from "../../components/Feedback";
import CommentsList from "../../components/CommentsList";
import AddCommentForm from "../../components/AddCommentForm";
import { supabaseClient } from "../../lib/client";
import type { GetStaticProps } from "next";
import type {
  FeedbackModel,
  CategoryModel,
  FeedbackStatusAggregate,
} from "../../types/models";

export interface FeedbackDetailsProps {
  feedback: FeedbackModel;
}

const FeedbackDetails: React.FC<FeedbackDetailsProps> = ({ feedback }) => {
  const user = supabaseClient.auth.user();
  const [comments, setComments] = React.useState<FeedbackModel["comments"]>(
    feedback?.comments || []
  );
  const onAddCommentHandler = async () => {
    const { data: comments, error: commentsError } = await supabaseClient
      .from("comments")
      .select(
        `*, user:profiles!comments_user_id_fkey (id, username, avatar_url, full_name)`
      )
      .eq("feedback_id", feedback.id);
    if (comments) {
      setComments(comments);
    }
  };
  return (
    <div className="flex flex-col min-h-screen py-2 container mx-auto gap-7 max-w-3xl  justify-center">
      <Head>
        <title>Feedback App - {feedback.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <Link href="/">
          <GoBackLink />
        </Link>
      </header>
      <main className="flex flex-col w-full gap-7">
        <Feedback feedback={feedback} commentsCount={comments?.length || 0} />
        <CommentsList
          comments={comments || []}
          totalComments={comments?.length || 0}
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
  const slug = context.params?.slug;

  const { data: feedback, error: feedbacksError } = await supabaseClient
    .from("feedbacks")
    .select(
      `
  *, 
  category:categories (id, name, slug),
  comments!comments_feedback_id_fkey (*, user:profiles!comments_user_id_fkey (id, username, avatar_url, full_name)),
  user:profiles!feedbacks_user_id_fkey (id, username, avatar_url, full_name),
  upvotes (user_id)
  `
    )
    .eq("slug", slug)
    .single();
  console.log("feedback", feedback);
  return {
    props: {
      feedback: feedback,
    },
    revalidate: 60,
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
