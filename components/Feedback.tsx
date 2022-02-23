import React, { useState } from "react";
import Tag from "./UI/Tag";
import Card from "./UI/Card";
import Upvote from "./UI/Upvote";
import type { FeedbackModel } from "../types/models";

type Props = {
  feedback: FeedbackModel;
  userUpvote?: boolean;
  commentsCount?: number;
};

const Feedback: React.FC<Props> = ({
  feedback,
  userUpvote = false,
  commentsCount = 0,
}: Props) => {
  const [upvotesCount, setUpvotesCount] = useState(
    feedback.upvotes?.length || 0
  );
  const [upvoted, setUpvoted] = useState(userUpvote);

  const handleClickUpvote = () => {
    setUpvoted(!upvoted);
    setUpvotesCount(upvoted ? upvotesCount - 1 : upvotesCount + 1);
  };
  return (
    <Card className="flex-row gap-10 justify-between items-start">
      <div className="flex-1">
        <Upvote
          active={upvoted}
          count={upvotesCount}
          onClick={handleClickUpvote}
        />
      </div>
      <div className="flex flex-col w-full">
        <a href={`/feedback/${feedback.slug}`}>
          <h3 className="text-gray-700 text-lg font-bold mb-1 hover:text-blue">
            {feedback.title}
          </h3>
          <p className="text-gray-500 font-normal">{feedback.description}</p>
        </a>
        <div className="mt-4">
          <Tag href={feedback.category.slug}>{feedback.category.name}</Tag>
        </div>
      </div>
      <a
        className="flex-1 self-center flex flex-row gap-3 items-center"
        href={`${feedback.slug}/comments`}
      >
        <svg width="18" height="16" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M2.62 16H1.346l.902-.91c.486-.491.79-1.13.872-1.823C1.036 11.887 0 9.89 0 7.794 0 3.928 3.52 0 9.03 0 14.87 0 18 3.615 18 7.455c0 3.866-3.164 7.478-8.97 7.478-1.017 0-2.078-.137-3.025-.388A4.705 4.705 0 012.62 16z"
            fill="#CDD2EE"
            fillRule="nonzero"
          />
        </svg>
        <span
          className={`${
            commentsCount > 0 ? "text-gray-700" : "text-gray-700/50"
          } font-bold`}
        >
          {commentsCount || 0}
        </span>
      </a>
    </Card>
  );
};
export default Feedback;
