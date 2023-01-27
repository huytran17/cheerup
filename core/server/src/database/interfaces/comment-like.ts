import Comment from "../entities/comment";
import User from "../entities/user";

export default interface ICommentLike {
  _id: string;
  comment: Comment;
  user: User;
  type: LikeType;
  created_at: Date;
}

export enum LikeType {
  Like = "like",
  Dislike = "dislike",
}
