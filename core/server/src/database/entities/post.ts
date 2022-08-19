import IPost from "../interfaces/post";
import Admin from "../entities/admin";
import Category from "../entities/category";

export default class Post implements IPost {
  public readonly _id: string;
  public readonly title: string;
  public readonly description: string;
  public readonly is_blocked_comment: boolean;
  public readonly thumbnail: Record<string, unknown>;
  public readonly content: string;
  public readonly source: string;
  public readonly author: Admin;
  public readonly created_by: Admin;
  public readonly is_published: boolean;
  public readonly categories: Category[];
  public readonly meta: {
    views: number;
  };
  public readonly created_at: Date;
  public readonly updated_at: Date;
  public readonly deleted_at: Date;

  constructor({
    _id,
    title,
    description,
    thumbnail,
    content,
    is_blocked_comment,
    author,
    categories,
    meta,
    source,
    is_published,
    created_at,
    updated_at,
    deleted_at,
    created_by
  }) {
    this._id = _id;
    this.title = title;
    this.description = description;
    this.is_published = is_published;
    this.thumbnail = thumbnail;
    this.is_blocked_comment = is_blocked_comment;
    this.content = content;
    this.author = author;
    this.categories = categories;
    this.meta = meta;
    this.source = source;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.deleted_at = deleted_at;
    this.created_by = created_by;
  }
}
