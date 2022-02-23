import React from "react";
import Card from "./UI/Card";
import type { FeedbackStatusAggregate } from "../types/models";

type Props = {
  feedbackStatuses: FeedbackStatusAggregate[];
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
        <div
          key={feedbackStatus.name}
          className="flex w-full text-gray-500 flex-row justify-between items-center"
        >
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
