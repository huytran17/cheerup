import IGallery from "../interfaces/gallery";
import Admin from "../entities/admin";

export default class Gallery implements IGallery {
  public readonly _id: string;
  public readonly name: string;
  public readonly parent: Gallery;
  public readonly items: {
    s3: Record<string, unknown>;
  }[];
  public readonly uploaded_by: Admin;
  public readonly created_at: Date;
  public readonly updated_at: Date;

  constructor({
    _id,
    name,
    items,
    parent,
    uploaded_by,
    created_at,
    updated_at,
  }: IGallery) {
    this._id = _id;
    this.name = name;
    this.items = items;
    this.parent = parent;
    this.uploaded_by = uploaded_by;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}
