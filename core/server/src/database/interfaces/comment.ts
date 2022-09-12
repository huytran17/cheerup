import User from "../entities/user";
import Post from "../entities/post";
import Comment from "../entities/comment";

export default interface IComment {
  _id: string;
  content: string;
  user: User;
  post: Post;
  children: Comment[];
  parent: Comment;
  meta: {
    likes: User[];
    dislikes: User[];
  };
  reports?: {
    created_by: User;
    created_at: Date;
    reasons: {
      main_reason: string;
      other_reason: string;
    };
  }[];
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}
