import React from "react";
import type { User } from "@supabase/supabase-js";
import { supabaseClient } from "../lib/client";
import Link from "next/link";

export interface Props {
  children: React.ReactNode;
  user?: User | null;
}
const Layout: React.FC<Props> = ({ children, user }) => {
  const handleSignOut = () => supabaseClient.auth.signOut();

  return (
    <>
      {children}
      <footer className="w-full py-7 flex items-center justify-center">
        {user ? (
          <>
            Currently logged-in as{" "}
            <span className="text-gray-500 ml-1">{user.email}</span>. Click{" "}
            <a
              className="cursor-pointer text-fushia hover:text-fushia-light ml-1"
              onClick={handleSignOut}
            >
              here to log-out
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
