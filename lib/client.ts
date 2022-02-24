import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const SUPBASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

const client = createClient(SUPABASE_URL, SUPBASE_ANON_KEY);

export { client as supabaseClient };

export const getFeedbackBySlug = (slug: string) => {
  return client
    .from("feedbacks")
    .select(
      `
*, 
category:categories (id, name, slug),
comments!comments_feedback_id_fkey (*, user:profiles!comments_user_id_fkey (id, username, avatar_url, full_name)),
user:profiles!feedbacks_user_id_fkey (id, username, avatar_url, full_name),
upvotes (user_id)
`
    )
    .eq("slug", slug)
    .single();
};

export const deleteUpvote = (feedbackId: number, userId: string) => {
  return client
    .from("upvotes")
    .delete()
    .match({ feedback_id: feedbackId, user_id: userId });
};

export const addUpvote = (feedbackId: number, userId: string) => {
  return client
    .from("upvotes")
    .insert([{ feedback_id: feedbackId, user_id: userId }]);
};
