import ICategory from "../interfaces/category";
import Admin from "../entities/admin";

export default class Category implements ICategory {
  public readonly _id: string;
  public readonly description: string;
  public readonly thumbnail?: Record<string, unknown>;
  public readonly title: string;
  public readonly badge_color?: string;
  public readonly thumbnail_url?: string;
  public readonly created_by: Admin;
  public readonly created_at: Date;
  public readonly updated_at: Date;
  public readonly deleted_at: Date;

  constructor({
    _id,
    title,
    created_at,
    thumbnail,
    description,
    updated_at,
    deleted_at,
    created_by,
    thumbnail_url,
    badge_color,
  }: ICategory) {
    this._id = _id;
    this.title = title;
    this.thumbnail = thumbnail;
    this.description = description;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.deleted_at = deleted_at;
    this.created_by = created_by;
    this.thumbnail_url = thumbnail_url;
    this.badge_color = badge_color;
  }
}
