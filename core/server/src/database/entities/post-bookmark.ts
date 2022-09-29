import IPostBookmark from "../interfaces/post-bookmark";
import Post from "../entities/post";
import User from "../entities/user";

export default class PostBookmark implements IPostBookmark {
  public readonly _id: string;
  public readonly post: Post;
  public readonly user: User;
  public readonly created_at: Date;
  public readonly updated_at: Date;

  constructor({ _id, post, user, created_at, updated_at }: IPostBookmark) {
    this._id = _id;
    this.post = post;
    this.user = user;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}
