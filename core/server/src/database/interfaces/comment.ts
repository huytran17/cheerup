import Admin from "../entities/admin";
import Post from "../entities/post";
import Comment from "../entities/comment";

export default interface IComment {
  _id: string;
  content: string;
  created_by: Admin;
  post: Post;
  children: Comment[];
  meta: {
    likes: number;
    dislike: number;
  };
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}
