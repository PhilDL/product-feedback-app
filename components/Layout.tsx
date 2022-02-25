import React from "react";
import Head from "next/head";
import Link from "next/link";
import { useUser } from "../utils/useUser";

export interface Props {
  children: React.ReactNode;
}
const Layout: React.FC<Props> = ({ children }) => {
  const handleSignOut = () => signOut();
  const { user, userProfile, userLoaded, signOut } = useUser();

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {children}
      <footer className="w-full py-7 px-6 text-center items-center justify-center md:px-0">
        {user ? (
          <>
            Logged-in as{" "}
            <span className="text-gray-500 ml-1">
              {userLoaded && userProfile.username}
            </span>
            <a
              className="cursor-pointer text-fushia hover:text-fushia-light ml-1"
              onClick={handleSignOut}
            >
              Click here to log-out
            </a>
          </>
        ) : (
          <>
            You will need to{" "}
            <Link href="/auth/signin">
              <a className="cursor-pointer text-fushia hover:text-fushia-light mx-1">
                Log-In
              </a>
            </Link>{" "}
            or{" "}
            <Link href="/auth/signup">
              <a className="cursor-pointer text-fushia hover:text-fushia-light mx-1">
                Sign-Up
              </a>
            </Link>{" "}
            to submit feedback and comment.
          </>
        )}
      </footer>
    </>
  );
};

export default Layout;
