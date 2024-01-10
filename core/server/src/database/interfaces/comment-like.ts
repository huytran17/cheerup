import IComment from "./comment";
import IUser from "./user";

export default interface ICommentLike {
  _id: string;
  comment: IComment;
  user: IUser;
  type: CommentLikeType;
  created_at: Date;
}

export enum CommentLikeType {
  Like = "like",
  Dislike = "dislike",
}
