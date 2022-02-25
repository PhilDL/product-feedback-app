import { useEffect, useState } from "react";
import type { Upvotes } from "../types/database";
import type { FeedbackModel } from "../types/models";
import { useUser } from "../utils/useUser";

const useUpvotedState = (feedback: FeedbackModel) => {
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

export default useUpvotedState;
