import useSWR, { useSWRConfig } from "swr";
import Feedback from "./Feedback";
import CommentsList from "./CommentsList";
import AddCommentForm from "./AddCommentForm";

const fetcher = async (input: RequestInfo) => {
  const res: Response = await fetch(input);
  return await res.json();
};

export interface FeedbackSWRComponentProps {
  slug: string;
  showComments?: boolean;
}
const FeedbackSWRComponent = ({
  slug,
  showComments = false,
}: FeedbackSWRComponentProps) => {
  const { data: feedback } = useSWR(`/api/feedback/${slug}`, fetcher);
  const { mutate } = useSWRConfig();
  const comments = feedback?.comments || [];

  const onAddCommentHandler = () => {
    mutate(`/api/feedback/${slug}`);
    mutate("/api/feedbacks");
  };
  const upvoteCallBack = () => {
    mutate(`/api/feedback/${slug}`);
    mutate("/api/feedbacks");
  };
  return (
    <>
      <Feedback
        feedback={feedback}
        commentsCount={comments?.length || 0}
        upvoteCallBack={upvoteCallBack}
      />
      {showComments && (
        <>
          <CommentsList
            comments={comments || []}
            totalComments={comments?.length || 0}
          />
          <AddCommentForm
            feedbackId={feedback.id}
            onAddComment={onAddCommentHandler}
          />
        </>
      )}
    </>
  );
};

export default FeedbackSWRComponent;
