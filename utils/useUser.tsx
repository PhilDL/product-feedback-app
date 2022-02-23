import { useEffect, useState, createContext, useContext } from "react";
import { supabaseClient } from "../lib/client";
import { Session, User, Provider } from "@supabase/supabase-js";
import { UserProfile } from "../types/database";

type UserContextType = {
  session: Session;
  user: User;
  userProfile: UserProfile;
  userLoaded: boolean;
  signIn: (options: SignInOptions) => Promise<{
    session: Session | null;
    user: User | null;
    provider?: Provider;
    url?: string | null;
    error: Error | null;
    data: Session | null;
  }>;
  signUp: (options: SignUpOptions) => Promise<{
    user: User | null;
    session: Session | null;
    error: Error | null;
    data: Session | User | null;
  }>;
  signOut: () => void;
};

export const UserContext =
  createContext<UserContextType | undefined>(undefined);

export const UserContextProvider = (props: any) => {
  const [userLoaded, setUserLoaded] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const session = supabaseClient.auth.session();
    setSession(session);
    setUser(session?.user ?? null);
    const { data: authListener } = supabaseClient.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
      }
    );

    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  const getUserProfile = () =>
    supabaseClient.from<UserProfile>("profiles").select("*").single();

  useEffect(() => {
    if (user) {
      Promise.allSettled([getUserProfile()]).then((results) => {
        const userProfilePromise = results[0];

        if (userProfilePromise.status === "fulfilled")
          setUserProfile(userProfilePromise.value.data);

        setUserLoaded(true);
      });
    }
  }, [user]);

  const value = {
    session,
    user,
    userProfile,
    userLoaded,
    signIn: (options: SignInOptions) => supabaseClient.auth.signIn(options),
    signUp: (options: SignUpOptions, metaData: SignUpMetadata) =>
      supabaseClient.auth.signUp(options, { data: metaData }),
    signOut: () => {
      setUserProfile(null);
      return supabaseClient.auth.signOut();
    },
  };

  return <UserContext.Provider value={value} {...props} />;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error(`useUser must be used within a UserContextProvider.`);
  }
  return context;
};

type SignInOptions = {
  email?: string;
  password?: string;
  provider?: Provider;
};

type SignUpOptions = {
  email: string;
  password: string;
};

type SignUpMetadata = {
  username?: string;
  avatar_url?: string;
  full_name?: string;
};
