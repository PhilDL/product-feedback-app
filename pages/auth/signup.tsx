import React, { useState } from "react";
import Link from "next/link";
import GoBackLink from "../../components/UI/GoBackLink";
import { supabaseClient } from "../../lib/client";
import Card from "../../components/UI/Card";
import Button from "../../components/UI/Button";
import TextField from "../../components/UI/TextField";
import { FormikProvider, Form, useFormik } from "formik";
import { slugify } from "../../lib/utils";
import * as Yup from "yup";

const SignUp = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitHandler = async (
    values: {
      email: string;
      password: string;
      username: string;
      full_name: string;
      avatar_url?: string;
    },
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setError(null);
    let avatar_url = values.avatar_url;
    if (!avatar_url) {
      avatar_url = `https://avatars.dicebear.com/api/bottts/${slugify(
        values.full_name
      )}.svg`;
    }
    try {
      const { error } = await supabaseClient.auth.signUp(
        {
          email: values.email,
          password: values.password,
        },
        {
          data: {
            username: values.username,
            full_name: values.full_name,
            avatar_url: avatar_url,
          },
        }
      );
      if (error) {
        setError(error.message);
      } else {
        setIsSubmitted(true);
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      full_name: "",
      username: "",
      email: "",
      password: "",
      avatar_url: "",
    },
    validationSchema: Yup.object({
      full_name: Yup.string()
        .required("Required")
        .min(4, "Ful Name must be at least 4 characters"),
      username: Yup.string()
        .required("Required")
        .min(4, "Username must be at least 4 characters"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .required("Required")
        .min(4, "Password must be at least 4 characters"),
      avatar_url: Yup.string().url("Must be a valid URL"),
    }),
    onSubmit: submitHandler,
  });

  return (
    <div className="flex flex-col min-h-screen py-7 container mx-auto max-w-xl justify-center gap-10">
      <header>
        <Link href="/">
          <GoBackLink />
        </Link>
      </header>
      <main className="flex flex-col w-full gap-7">
        <Card className="flex-col gap-3 relative">
          <svg
            width="40"
            height="40"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute -top-5"
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
            Create an account
          </h1>
          {error && <div className="text-red">{error}</div>}
          {isSubmitted ? (
            <h4>
              Please check {formik.values.email} for the confirmation link
            </h4>
          ) : (
            <FormikProvider value={formik}>
              <Form>
                <div>
                  <TextField
                    label="Name"
                    name="full_name"
                    required={true}
                    disabled={formik.isSubmitting}
                  />
                  <TextField
                    label="Avatar Url"
                    name="avatar_url"
                    required={false}
                    disabled={formik.isSubmitting}
                  />
                  <TextField
                    label="Username"
                    name="username"
                    required={true}
                    disabled={formik.isSubmitting}
                  />
                  <TextField
                    label="Email"
                    name="email"
                    required={true}
                    disabled={formik.isSubmitting}
                  />
                  <TextField
                    label="Password"
                    type="password"
                    name="password"
                    required={true}
                    disabled={formik.isSubmitting}
                  />
                  <div className="flex justify-between items-center">
                    <Button
                      type="submit"
                      role="primary"
                      disabled={formik.isSubmitting}
                    >
                      Sign in
                    </Button>
                    <Link href="/auth/signin">
                      <a className="text-fushia cursor-pointer hover:text-fushia-light">
                        Already have an account ?
                      </a>
                    </Link>
                  </div>
                </div>
              </Form>
            </FormikProvider>
          )}
        </Card>
      </main>
    </div>
  );
};

export default SignUp;
