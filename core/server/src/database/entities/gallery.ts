import IGallery from "../interfaces/gallery";
import { ModelType } from "../interfaces/gallery";
import Post from "../entities/post";
import User from "../entities/user";
import Admin from "../entities/admin";

export default class Gallery implements IGallery {
  public readonly _id: string;
  public readonly post: Post;
  public readonly items: {
    s3: Record<string, unknown>;
  }[];
  public readonly model_type: ModelType;
  public readonly created_by: Admin | User;
  public readonly created_at: Date;
  public readonly updated_at: Date;

  constructor({
    _id,
    post,
    items,
    model_type,
    created_by,
    created_at,
    updated_at,
  }: IGallery) {
    this._id = _id;
    this.post = post;
    this.items = items;
    this.model_type = model_type;
    this.created_by = created_by;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}
