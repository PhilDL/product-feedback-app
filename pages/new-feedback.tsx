import React, { useState } from "react";
import Head from "next/head";
import { GetStaticProps } from "next";
import Link from "next/link";
import { useSWRConfig } from "swr";
import { useRouter } from "next/router";
import { supabaseClient, getAllFeedbacks } from "../lib/client";
import { slugify } from "../lib/utils";
import {
  Card,
  Button,
  ButtonLink,
  GoBackLink,
  TextField,
  TextAreaField,
  SelectField,
} from "../components/UI";
import { FormikProvider, Form, useFormik } from "formik";
import { useUser } from "../utils/useUser";
import * as Yup from "yup";
import type { CategoryModel } from "../types/models";

export interface NewFeedbackProps {
  categories: CategoryModel[];
}

const NewFeedback: React.FC<NewFeedbackProps> = ({ categories }) => {
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser();
  const router = useRouter();
  const { mutate } = useSWRConfig();

  const loginButtonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push({
      pathname: "/auth/signin",
      query: { returnUrl: router.asPath },
    });
  };

  const submitHandler = async (
    values: { title: string; category_id: string; description: string },
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    if (!user) {
      setError("You must be logged in to create a feedback.");
      return null;
    }
    const { data, error } = await supabaseClient.from("feedbacks").insert([
      {
        title: values.title,
        description: values.description,
        category_id: parseInt(values.category_id),
        user_id: user.id,
        slug: slugify(values.title),
      },
    ]);
    if (error) {
      setError(error.message);
      return;
    } else {
      setError(null);
    }
    setSubmitting(false);
    const { data: newFeedbacks } = await getAllFeedbacks();
    if (data) {
      mutate("/api/feedbacks", newFeedbacks);
    }
    router.push("/");
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      category_id: "",
      description: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Required"),
      category_id: Yup.string().required("Required"),
      description: Yup.string()
        .required("Required")
        .min(60, "Must be at least 60 characters"),
    }),
    onSubmit: submitHandler,
  });

  return (
    <div className="flex min-h-screen py-7 px-6 md:px-0 container mx-auto max-w-xl">
      <Head>
        <title>Shubmit a new Feedback | Product Feedback App</title>
        <meta
          name="description"
          content="Submit a new feedback here, please be descriptive."
        />
      </Head>
      <main className="flex flex-col w-full gap-7 justify-around">
        <header className="py-7">
          <Link href="/" passHref>
            <GoBackLink />
          </Link>
        </header>

        <Card className="flex-col gap-3 relative">
          <svg
            width="56"
            height="56"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute -top-7"
          >
            <defs>
              <radialGradient
                cx="103.9%"
                cy="-10.387%"
                fx="103.9%"
                fy="-10.387%"
                r="166.816%"
                id="a"
              >
                <stop stopColor="#E84D70" offset="0%" />
                <stop stopColor="#A337F6" offset="53.089%" />
                <stop stopColor="#28A7ED" offset="100%" />
              </radialGradient>
            </defs>
            <g fill="none" fillRule="evenodd">
              <circle fill="url(#a)" cx="28" cy="28" r="28" />
              <path
                fill="#FFF"
                fillRule="nonzero"
                d="M30.343 36v-5.834h5.686v-4.302h-5.686V20h-4.597v5.864H20v4.302h5.746V36z"
              />
            </g>
          </svg>
          <h1 className="text-xl text-gray-700 font-bold mt-8">
            Create New Feedback
          </h1>
          {error && <div className="text-red">{error}</div>}
          <FormikProvider value={formik}>
            <Form id="newFeedback" className="flex flex-col gap-6">
              <TextField
                label="Feedback Title"
                help="Add a short, descriptive headline"
                name="title"
                required={true}
              />
              <SelectField
                label="Category"
                inputName="category_id"
                name="category_id"
                help="Choose a category for your feedback"
                options={categories}
                defaultValue="1"
                required={true}
                form="newFeedback"
              />
              <TextAreaField
                name="description"
                label="Feedback Detail"
                help="Include any specific comments on what should be improved, added, etc."
              />
              <div className="flex justify-between flex-col md:flex-row-reverse gap-3 text-center md:text-left md:gap-0">
                {user && user.id ? (
                  <Button
                    type="submit"
                    role="primary"
                    disabled={formik.isSubmitting}
                  >
                    Add Feedback
                  </Button>
                ) : (
                  <Button role="primary" onClick={loginButtonHandler}>
                    LogIn
                  </Button>
                )}

                <Link href="/" passHref>
                  <ButtonLink role="default">Cancel</ButtonLink>
                </Link>
              </div>
            </Form>
          </FormikProvider>
        </Card>
      </main>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { data, error } = await supabaseClient
    .from("categories")
    .select("*")
    .order("id");
  return {
    props: {
      categories: data,
    },
    revalidate: 3000, // seconds
  };
};

export default NewFeedback;
