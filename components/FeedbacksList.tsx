import React from "react";
import Feedback from "./Feedback";
import NoFeedback from "./NoFeedback";
import type { FeedbackModel } from "../types/models";

export type FeedbacksListProps = {
  feedbacks: FeedbackModel[];
  upvoteCallBack?: (
    feedbackSlug: string,
    feedbackId: number,
    oldUpvoteState: boolean
  ) => void;
};

const FeedbacksList: React.FC<FeedbacksListProps> = ({
  feedbacks,
  upvoteCallBack = () => {},
}: FeedbacksListProps) => {
  if (feedbacks.length === 0) {
    return <NoFeedback />;
  }
  return (
    <div className="flex flex-col gap-4 px-6 sm:px-0">
      {feedbacks.map((feedback) => (
        <Feedback
          key={feedback.id}
          feedback={feedback}
          upvoteCallBack={upvoteCallBack}
        />
      ))}
    </div>
  );
};
export default FeedbacksList;
