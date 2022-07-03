import User from "../entities/user";
import Post from "../entities/post";
import Comment from "../entities/comment";

export default interface IComment {
  _id: string;
  content: string;
  user: User;
  post: Post;
  children: Comment[];
  meta: Record<string, unknown>;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}
