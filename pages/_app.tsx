import "../styles/globals.css";
import type { AppProps } from "next/app";
import type { AuthSession } from "@supabase/supabase-js";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { supabaseClient } from "../lib/client";
import Layout from "../components/Layout";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const user = supabaseClient.auth.user();

  useEffect(() => {
    const { data: authListener } = supabaseClient.auth.onAuthStateChange(
      async (event: string, session: AuthSession | null) => {
        handleAuthSession(event, session);
        if (event === "SIGNED_IN") {
          const signedInUser = supabaseClient.auth.user();
          if (signedInUser) {
            const userId = signedInUser.id;
            const { data, error } = await supabaseClient
              .from("profiles")
              .upsert({ id: userId });
            if (!error) {
              router.push("/");
            }
          }
        }
        if (event === "SIGNED_OUT") {
          router.push("/auth/signin");
        }
      }
    );

    return () => {
      authListener && authListener.unsubscribe();
    };
  }, [router]);

  useEffect(() => {
    if (user) {
      if (router.pathname === "/auth/signin") {
        router.push("/");
      }
    }
  }, [router.pathname, user, router]);

  const handleAuthSession = async (
    event: string,
    session: AuthSession | null
  ) => {
    await fetch("/api/auth", {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      credentials: "same-origin",
      body: JSON.stringify({ event, session }),
    });
  };

  return (
    <Layout user={user}>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
