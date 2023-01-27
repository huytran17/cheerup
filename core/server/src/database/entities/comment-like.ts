import ICommentLike, { CommentLikeType } from "../interfaces/comment-like";
import Comment from "./comment";
import User from "./user";

export default class CommentLike implements ICommentLike {
  public readonly _id: string;
  public readonly comment: Comment;
  public readonly user: User;
  public readonly type: CommentLikeType;
  public readonly created_at: Date;

  constructor({ _id, comment, user, type, created_at }: ICommentLike) {
    this._id = _id;
    this.comment = comment;
    this.user = user;
    this.type = type;
    this.created_at = created_at;
  }
}
