import React from "react";
import Feedback from "./Feedback";
import NoFeedback from "./NoFeedback";
import type { FeedbackModel } from "../types/models";

type Props = {
  feedbacks: FeedbackModel[];
  upvoteCallBack?: (
    feedbackSlug: string,
    feedbackId: number,
    oldUpvoteState: boolean
  ) => void;
};

const FeedbacksList: React.FC<Props> = ({
  feedbacks,
  upvoteCallBack = () => {},
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
          upvoteCallBack={upvoteCallBack}
        />
      ))}
    </div>
  );
};
export default FeedbacksList;
