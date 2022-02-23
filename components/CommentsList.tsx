import React from "react";
import Comment from "./Comment";
import type { CommentModel } from "../types/models";

type Props = {
  comments?: CommentModel[];
  totalComments: number;
};

const CommentsList: React.FC<Props> = ({ comments, totalComments }: Props) => {
  return (
    <div className="bg-white px-12 py-6 rounded">
      <h4 className="text-gray-700 font-bold text-lg -ml-5">
        {totalComments} Comments
      </h4>
      {comments && comments.length > 0 && (
        <div className="divide-y flex flex-col divide-gray-100">
          {comments.map((comment) => (
            <Comment comment={comment} />
          ))}
        </div>
      )}
    </div>
  );
};
export default CommentsList;
