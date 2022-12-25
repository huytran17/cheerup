import IComment from "../interfaces/comment";
import User from "./user";
import Post from "./post";

export default class Comment implements IComment {
  public readonly _id: string;
  public readonly content: string;
  public readonly user: User;
  public readonly reports?: {
    created_by: User;
    created_at: Date;
    reasons: {
      main_reason: string;
      other_reason: string;
    };
  }[];
  public readonly post: Post;
  public readonly parent: Comment;
  public readonly children: Comment[];
  public readonly meta: {
    likes: User[];
    dislikes: User[];
  };
  public readonly created_at: Date;
  public readonly updated_at: Date;
  public readonly deleted_at: Date;

  constructor({
    _id,
    content,
    user,
    post,
    children,
    meta,
    created_at,
    updated_at,
    deleted_at,
  }: IComment) {
    this._id = _id;
    this.content = content;
    this.user = user;
    this.post = post;
    this.children = children;
    this.meta = meta;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.deleted_at = deleted_at;
  }
}
