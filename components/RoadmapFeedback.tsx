import React from "react";
import Tag from "./UI/Tag";
import Upvote from "./UI/Upvote";
import type { FeedbackModel } from "../types/models";
import { useUpvotedState } from "../utils/useUpvotes";
import Link from "next/link";

type RoadmapFeedbackProps = {
  feedback: FeedbackModel;
  upvoteCallBack?: (
    feedbackSlug: string,
    feedbackId: number,
    oldUpvoteState: boolean
  ) => void;
  statusColor: string;
  statusName: string;
};

const RoadmapFeedback: React.FC<RoadmapFeedbackProps> = ({
  feedback,
  upvoteCallBack = () => {},
  statusColor,
  statusName,
}) => {
  const upvoted = useUpvotedState(feedback);
  const commentsCount = feedback.comments?.length || 0;

  return (
    <div className="bg-white rounded overflow-hidden">
      <div
        className="border-t-4 flex p-6 flex-col gap-2 justify-between items-start"
        style={{ borderTop: `6px solid ${statusColor}` }}
      >
        <span className="font-normal text-gray-500">
          <span
            style={{ borderColor: statusColor }}
            className="rounded-full border-4 w-1 h-1 inline-block mr-3"
          ></span>
          {statusName}
        </span>
        <div className="flex flex-col w-full mb-2">
          <Link href={`/feedback/${feedback.slug}`} passHref>
            <a>
              <h3 className="text-gray-700 text-lg font-bold mb-1 hover:text-blue">
                {feedback.title}
              </h3>
              <p className="text-gray-500 font-normal">
                {feedback.description}
              </p>
            </a>
          </Link>

          <div className="mt-4">
            <Tag>{feedback.category.name}</Tag>
          </div>
        </div>
        <div className="flex justify-between w-full items-center">
          <Upvote
            active={upvoted}
            count={feedback.upvotes?.length || 0}
            onClick={() => upvoteCallBack(feedback.slug, feedback.id, upvoted)}
            inlineStyle={true}
          />
          <a
            className="self-center flex flex-row gap-3 items-center"
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
        </div>
      </div>
    </div>
  );
};
export default RoadmapFeedback;
