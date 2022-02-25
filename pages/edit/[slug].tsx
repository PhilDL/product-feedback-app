import { useSWRConfig } from "swr";
import { useRouter } from "next/router";
import Head from "next/head";
import React, { useState } from "react";
import Link from "next/link";
import {
  GoBackLink,
  Card,
  Button,
  ButtonLink,
  TextField,
  TextAreaField,
  SelectField,
} from "../../components/UI";
import {
  supabaseClient,
  getFeedbackBySlug,
  getAllFeedbacks,
} from "../../lib/client";
import { FormikProvider, Form, useFormik } from "formik";
import { useUser } from "../../utils/useUser";
import * as Yup from "yup";
import type { FeedbackModel } from "../../types/models";
import type { GetServerSideProps } from "next";
import type { Category } from "../../types/database";

export interface EditFeedbackProps {
  feedback: FeedbackModel;
  categories: Category[];
}

const EditFeedback: React.FC<EditFeedbackProps> = ({
  feedback,
  categories,
}) => {
  const { mutate } = useSWRConfig();
  const { user } = useUser();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const statuses = [
    { name: "Planned", id: "planned" },
    { name: "In-Progress", id: "in-progress" },
    { name: "Live", id: "live" },
  ];

  const loginButtonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push({
      pathname: "/auth/signin",
      query: { returnUrl: router.asPath },
    });
  };

  const deleteButtonHandler = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    const { error } = await supabaseClient
      .from("feedbacks")
      .delete()
      .match({ id: feedback.id });
    if (error) {
      setError(error.message);
      return;
    } else {
      setError(null);
    }
    const { data: newFeedbacks } = await getAllFeedbacks();
    mutate("/api/feedbacks", newFeedbacks);
    router.push("/");
  };

  const submitHandler = async (
    values: {
      title: string;
      category_id: string;
      description: string;
      status: string | undefined;
    },
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    if (!user) {
      setError("You must be logged in to create a feedback.");
      return null;
    }
    const { error } = await supabaseClient
      .from("feedbacks")
      .update({
        title: values.title,
        description: values.description,
        category_id: parseInt(values.category_id),
        status: values.status,
      })
      .match({ id: feedback.id });
    if (error) {
      setError(error.message);
      return;
    } else {
      setError(null);
    }
    setSubmitting(false);
    const { data: newFeedbacks, error: newFeedbacksError } =
      await getAllFeedbacks();
    mutate("/api/feedbacks", newFeedbacks);
    router.push("/");
  };

  const formik = useFormik({
    initialValues: {
      title: feedback.title,
      category_id: `${feedback.category_id}`,
      description: feedback.description,
      status: feedback.status,
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
        <title>Editing {feedback.title}</title>
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
            width="40"
            height="40"
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
              <circle fill="url(#a)" cx="20" cy="20" r="20" />
              <path
                d="M19.512 15.367l4.975 4.53-3.8 5.54L11.226 29l4.485-4.1c.759.275 1.831.026 2.411-.594a1.958 1.958 0 00-.129-2.82c-.836-.745-2.199-.745-2.964.068-.57.607-.767 1.676-.44 2.381L11 28.713c.255-1.06.683-2.75 1.115-4.436l.137-.531c.658-2.563 1.287-4.964 1.287-4.964l5.973-3.415zM23.257 12L28 16.443l-2.584 2.606-4.89-4.583L23.257 12z"
                fill="#FFF"
                fillRule="nonzero"
              />
            </g>
          </svg>
          <h1 className="text-xl text-gray-700 font-bold mt-8">
            Editing ‘{feedback.title}’
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
                defaultValue={feedback.category_id}
                required={true}
                form="newFeedback"
              />
              <SelectField
                label="Update Status"
                inputName="status"
                name="status"
                help="Change feedback state"
                options={statuses}
                defaultValue={feedback.status || "planned"}
                required={true}
                form="newFeedback"
              />
              <TextAreaField
                name="description"
                label="Feedback Detail"
                help="Include any specific comments on what should be improved, added, etc."
              />
              <div className="flex justify-between flex-col md:flex-row-reverse gap-3 text-center md:text-left md:gap-0">
                <div className="flex flex-col gap-3 md:justify-between md:flex-row-reverse">
                  {user && user.id ? (
                    <Button
                      type="submit"
                      role="primary"
                      disabled={formik.isSubmitting}
                    >
                      Edit Feedback
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
                {user && (
                  <Button
                    name="delete"
                    role="danger"
                    onClick={deleteButtonHandler}
                    disabled={formik.isSubmitting}
                  >
                    Delete
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const slug = context.params?.slug as string;

  const { data: categories, error } = await supabaseClient
    .from("categories")
    .select("*")
    .order("id");
  const { data: feedback, error: feedbacksError } = await getFeedbackBySlug(
    slug
  );
  return {
    props: {
      feedback: feedback,
      categories: categories,
    },
  };
};

export default EditFeedback;
