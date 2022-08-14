import IPost from "../interfaces/post";
import Admin from "../entities/admin";
import Category from "../entities/category";

export default class Post implements IPost {
  public readonly _id: string;
  public readonly title: string;
  public readonly description: string;
  public readonly is_block_comment: boolean;
  public readonly thumbnail: Record<string, unknown>;
  public readonly content: string;
  public readonly source: string;
  public readonly author: Admin;
  public readonly category: Category;
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
    is_block_comment,
    author,
    category,
    meta,
    source,
    created_at,
    updated_at,
    deleted_at,
  }) {
    this._id = _id;
    this.title = title;
    this.description = description;
    this.thumbnail = thumbnail;
    this.is_block_comment = is_block_comment;
    this.content = content;
    this.author = author;
    this.category = category;
    this.meta = meta;
    this.source = source;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.deleted_at = deleted_at;
  }
}
