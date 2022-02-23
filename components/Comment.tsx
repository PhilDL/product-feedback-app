import React from "react";
import type { CommentModel } from "../types/models";
import Image from "next/image";

type Props = {
  comment: CommentModel;
};

const Comment: React.FC<Props> = ({ comment }: Props) => {
  const { user, content, replying_to: replyingTo, replies } = comment;

  return (
    <section className="feedback-comment">
      <div
        className={`relative ${replyingTo && "ml-10"} ${
          replies && replies.length > 0 && "with-replies"
        }`}
      >
        <div
          className={`flex flex-row gap-5 ${
            replyingTo ? "my-3" : "my-8"
          } justify-between items-start text-gray-500 font-normal`}
        >
          <div className="-ml-5">
            <Image
              src={user?.avatar_url || ""}
              alt={user.username}
              width={40}
              height={40}
              className="rounded-full w-10 absolute"
            />
          </div>
          <div className="flex flex-col w-full pl-10">
            <span>
              <h3 className="text-gray-700 text-sm font-bold tracking-tight">
                {user.full_name}
              </h3>
              <span className="text-sm">@{user.username}</span>
            </span>
            <p className="mt-2 max-w-prose">
              {replyingTo && (
                <span className="font-bold text-fushia mr-3">
                  @{replyingTo}
                </span>
              )}
              {content}
            </p>
          </div>
        </div>
        {replies && replies.length > 0 && (
          <div className="bg-white flex flex-col justify-between items-start">
            {replies.map((reply) => (
              <Comment key={reply.id} comment={reply} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
export default Comment;
