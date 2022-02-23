import React from "react";
import Feedback from "./Feedback";
import NoFeedback from "./NoFeedback";
import type { FeedbackModel } from "../types/models";

type Props = {
  feedbacks: FeedbackModel[];
  userUpvotedFeedbacksIds?: number[];
};

const FeedbacksList: React.FC<Props> = ({
  feedbacks,
  userUpvotedFeedbacksIds,
}: Props) => {
  if (feedbacks.length === 0) {
    return <NoFeedback />;
  }
  return (
    <div className="flex flex-col gap-4">
      {feedbacks.map((feedback) => (
        <Feedback
          key={feedback.id}
          feedback={feedback}
          commentsCount={feedback.comments?.length || 0}
          userUpvote={
            userUpvotedFeedbacksIds &&
            userUpvotedFeedbacksIds.includes(feedback.id)
          }
        />
      ))}
    </div>
  );
};
export default FeedbacksList;