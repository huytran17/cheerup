import Comment from "../entities/comment";
import User from "../entities/user";

export default interface ICommentLike {
  _id: string;
  comment: Comment;
  user: User;
  type: CommentLikeType;
  created_at: Date;
}

export enum CommentLikeType {
  Like = "like",
  Dislike = "dislike",
}
