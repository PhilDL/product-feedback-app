import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import GoBackLink from "../../components/UI/GoBackLink";
import Card from "../../components/UI/Card";
import Button from "../../components/UI/Button";
import TextField from "../../components/UI/TextField";
import { FormikProvider, Form, useFormik } from "formik";
import { useUser } from "../../utils/useUser";
import * as Yup from "yup";

const SignIn = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [magicLinkAuth, setMagicLinkAuth] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { signIn, user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user]);

  const submitHandler = async (
    values: { email: string; password?: string },
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setSubmitting(true);
    setError(null);
    let email = values.email;
    let password = values.password;
    if (!email) {
      return setError("Email is required");
    }
    try {
      const { error } = await signIn({
        email,
        password,
      });
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

  const formikMagicLink = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
    }),
    onSubmit: submitHandler,
  });

  const formikPassword = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
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
          {error && <div className="text-red">{error}</div>}
          {magicLinkAuth ? (
            <>
              <h1 className="text-xl text-gray-700 font-bold mt-8">
                Sign-In with magic link
              </h1>
              <a
                className="cursor-pointer text-blue-light hover:text-blue-gray-700 text-sm"
                onClick={() => setMagicLinkAuth(false)}
              >
                Prefer to use password ?
              </a>
              {isSubmitted ? (
                <h4 className="mt-3 text-gray-700">
                  Please check{" "}
                  <span className="text-blue-light">
                    {formikMagicLink.values.email}
                  </span>{" "}
                  for login link
                </h4>
              ) : (
                <FormikProvider value={formikMagicLink}>
                  <Form>
                    <div>
                      <TextField
                        label="Email"
                        name="email"
                        required={true}
                        disabled={formikMagicLink.isSubmitting}
                      />
                      <div className="flex justify-between items-center">
                        <Button
                          type="submit"
                          role="primary"
                          disabled={formikMagicLink.isSubmitting}
                        >
                          Sign in
                        </Button>
                        <Link href="/auth/signup">
                          <a className="text-fushia cursor-pointer hover:text-fushia-light">
                            Or signup to create an account
                          </a>
                        </Link>
                      </div>
                    </div>
                  </Form>
                </FormikProvider>
              )}
            </>
          ) : (
            <>
              <h1 className="text-xl text-gray-700 font-bold mt-8">
                Sign-In with password
              </h1>
              <a
                className="cursor-pointer text-blue-light hover:text-blue-gray-700 text-sm"
                onClick={() => setMagicLinkAuth(true)}
              >
                Authenticate with magic link ?
              </a>
              <FormikProvider value={formikPassword}>
                <Form>
                  <div>
                    <TextField
                      label="Email"
                      name="email"
                      required={true}
                      disabled={formikPassword.isSubmitting}
                    />
                    <TextField
                      label="Password"
                      name="password"
                      type="password"
                      required={true}
                      disabled={formikPassword.isSubmitting}
                    />
                    <div className="flex justify-between items-center">
                      <Button
                        type="submit"
                        role="primary"
                        disabled={formikPassword.isSubmitting}
                      >
                        Sign in
                      </Button>
                      <Link href="/auth/signup">
                        <a className="text-fushia cursor-pointer hover:text-fushia-light">
                          Or signup to create an account
                        </a>
                      </Link>
                    </div>
                  </div>
                </Form>
              </FormikProvider>
            </>
          )}
        </Card>
      </main>
    </div>
  );
};

export default SignIn;
