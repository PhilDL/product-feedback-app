import { SWRConfig } from "swr";
import Head from "next/head";
import React from "react";
import Link from "next/link";
import GoBackLink from "../../components/UI/GoBackLink";
import FeedbackSWRComponent from "../../components/FeedbackSWRComponent";
import { supabaseClient, getFeedbackBySlug } from "../../lib/client";
import type { GetStaticProps } from "next";

export interface FeedbackDetailsProps {
  fallback: any;
  slug: string;
}

const FeedbackDetails: React.FC<FeedbackDetailsProps> = ({
  fallback,
  slug,
}) => {
  return (
    <SWRConfig value={{ fallback }}>
      <div className="flex flex-col min-h-screen py-2 container mx-auto gap-7 max-w-3xl  justify-center">
        <Head>
          <title>Feedback App </title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <header>
          <Link href="/" passHref>
            <GoBackLink />
          </Link>
        </header>
        <main className="flex flex-col w-full gap-7">
          <FeedbackSWRComponent slug={slug} showComments={true} />
        </main>
      </div>
    </SWRConfig>
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
      slug: slug,
    },
    revalidate: 10,
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
