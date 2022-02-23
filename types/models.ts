import type {
  UserProfile,
  Feedback,
  Comment,
  Upvotes,
  Category,
} from "./database";

export interface CommentModel extends Comment {
  user: UserProfile;
  replies?: CommentModel[];
}

export interface FeedbackModel extends Feedback {
  user: UserProfile;
  category: Category;
  comments?: CommentModel[];
  upvotes?: Upvotes[];
}

export interface CategoryModel extends Category {}

export interface FeedbackStatusAggregate {
  name: string;
  key: string;
  color: string;
  count: number;
}
