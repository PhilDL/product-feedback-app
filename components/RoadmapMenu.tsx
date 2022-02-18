import React from "react";
import Tag from "./UI/Tag";
import Card from "./UI/Card";
type FeedbackStatus = {
  name: string;
  count: number;
  color: string;
};
type Props = {
  feedbackStatuses: FeedbackStatus[];
};

const RoadmapMenu: React.FC<Props> = ({ feedbackStatuses }: Props) => {
  return (
    <Card className="flex-col gap-3 items-start">
      <div className="flex w-full flex-row justify-between">
        <h3 className="text-gray-700 text-lg font-bold">Roadmap</h3>
        <a href="/roadmap" className="underline text-blue text-sm">
          View
        </a>
      </div>
      {feedbackStatuses.map((feedbackStatus) => (
        <div className="flex w-full text-gray-500 flex-row justify-between items-center">
          <span className="font-normal">
            <span
              style={{ borderColor: feedbackStatus.color }}
              className="rounded-full border-4 w-1 h-1 inline-block mr-3"
            ></span>
            {feedbackStatus.name}
          </span>
          <span className="font-bold">{feedbackStatus.count}</span>
        </div>
      ))}
    </Card>
  );
};
export default RoadmapMenu;
