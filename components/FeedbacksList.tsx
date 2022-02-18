import React from "react";
import Feedback from "./Feedback";
import NoFeedback from "./NoFeedback";
type TagModel = {
  name: string;
  slug: string;
};

type FeedbackModel = {
  id: string;
  title: string;
  slug: string;
  description: string;
  upvotes: number;
  comments: number;
  tag: TagModel;
};

type Props = {
  feedbacks: FeedbackModel[];
  userUpvotedFeedbacksIds: string[];
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
          userUpvote={userUpvotedFeedbacksIds.includes(feedback.id)}
        />
      ))}
    </div>
  );
};
export default FeedbacksList;
