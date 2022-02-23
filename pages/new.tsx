import React, { useState } from "react";
import { GetStaticProps } from "next";
import Link from "next/link";

import { useRouter } from "next/router";
import { supabaseClient } from "../lib/client";
import { slugify } from "../lib/utils";
import Card from "../components/UI/Card";
import Button from "../components/UI/Button";
import ButtonLink from "../components/UI/ButtonLink";
import GoBackLink from "../components/UI/GoBackLink";
import TextField from "../components/UI/TextField";
import TextAreaField from "../components/UI/TextAreaField";
import SelectField from "../components/UI/SelectField";
import { FormikProvider, Form, useFormik } from "formik";
import { useUser } from "../utils/useUser";
import * as Yup from "yup";

export interface Category {
  id: number;
  name: string;
  created_at: string;
}
export interface NewFeedbackProps {
  categories: Category[];
}

const NewFeedback: React.FC<NewFeedbackProps> = ({ categories }) => {
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser();
  const router = useRouter();

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
    <div className="flex min-h-screen py-7 container mx-auto max-w-xl">
      <main className="flex flex-col w-full gap-7 justify-around">
        <header>
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
              <div className="flex justify-between">
                <Link href="/" passHref>
                  <ButtonLink role="default">Cancel</ButtonLink>
                </Link>
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
