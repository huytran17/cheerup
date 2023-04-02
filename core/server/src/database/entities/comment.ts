import IComment, { CommentType } from "../interfaces/comment";
import User from "./user";
import Post from "./post";

export default class Comment implements IComment {
  public readonly _id: string;
  public readonly content: string;
  public readonly user: User;
  public readonly guest: Record<string, unknown>;
  public readonly type: CommentType;
  public readonly post: Post;
  public readonly parent: Comment;
  public readonly is_parent: boolean;
  public readonly has_children: boolean;
  public readonly children: Comment[];
  public readonly created_at: Date;
  public readonly updated_at: Date;

  constructor({
    _id,
    content,
    user,
    post,
    children,
    parent,
    is_parent,
    has_children,
    created_at,
    updated_at,
    guest,
    type,
  }: IComment) {
    this._id = _id;
    this.content = content;
    this.user = user;
    this.post = post;
    this.children = children;
    this.parent = parent;
    this.has_children = has_children;
    this.is_parent = is_parent;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.guest = guest;
    this.type = type;
  }
}
