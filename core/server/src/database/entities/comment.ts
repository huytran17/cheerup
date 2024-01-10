import IComment from "../interfaces/comment";
import IUser from "../interfaces/user";
import IPost from "../interfaces/post";

export default class Comment implements IComment {
  public readonly _id: string;
  public readonly content: string;
  public readonly user: IUser;
  public readonly post: IPost;
  public readonly parent: IComment;
  public readonly is_parent: boolean;
  public readonly has_children: boolean;
  public readonly children: IComment[];
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
  }
}
