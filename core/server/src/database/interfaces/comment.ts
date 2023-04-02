import User from "../entities/user";
import Post from "../entities/post";
import Comment from "../entities/comment";

export enum CommentType {
  MEMBER = "member",
  GUEST = "guest",
}

export default interface IComment {
  _id: string;
  content: string;
  user: User;
  guest: Record<string, unknown>;
  type: CommentType;
  post: Post;
  children: Comment[];
  parent: Comment;
  is_parent: boolean;
  has_children: boolean;
  created_at: Date;
  updated_at: Date;
}
