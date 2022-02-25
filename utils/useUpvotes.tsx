import { useEffect, useState } from "react";
import type { Upvotes } from "../types/database";
import type { FeedbackModel } from "../types/models";
import { useUser } from "./useUser";
import { deleteUpvote, addUpvote } from "../lib/client";
import { useSWRConfig } from "swr";

export const useUpvotedState = (feedback: FeedbackModel) => {
  const { user } = useUser();
  const [upvoted, setUpvoted] = useState(false);

  useEffect(() => {
    if (user && feedback) {
      const upvote = feedback.upvotes.find(
        (upvote: Upvotes) => upvote.user_id === user.id
      );
      if (upvote) {
        setUpvoted(true);
      } else {
        setUpvoted(false);
      }
    }
  }, [user, feedback]);

  return upvoted;
};

export const useUpvoteChange = () => {
  const { user } = useUser();
  const { mutate } = useSWRConfig();

  const onChangeUpvoteHandler = async (
    feedbackSlug: string,
    feedbackId: number,
    oldUpvoteState: boolean
  ) => {
    if (user) {
      if (oldUpvoteState) {
        await deleteUpvote(feedbackId, user.id);
      } else {
        await addUpvote(feedbackId, user.id);
      }
      mutate(`/api/feedback/${feedbackSlug}`);
      mutate(`/api/feedbacks`);
    }
  };

  return { onChangeUpvoteHandler };
};
