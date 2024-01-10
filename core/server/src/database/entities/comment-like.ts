import IComment from "../interfaces/comment";
import ICommentLike, { CommentLikeType } from "../interfaces/comment-like";
import IUser from "../interfaces/user";

export default class CommentLike implements ICommentLike {
  public readonly _id: string;
  public readonly comment: IComment;
  public readonly user: IUser;
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
