import IAdmin from "../interfaces/admin";
import ICategory from "../interfaces/category";
import IPost from "../interfaces/post";

export default class Post implements IPost {
  public readonly _id: string;
  public readonly title: string;
  public readonly slug: string;
  public readonly description: string;
  public readonly thumbnail_url?: string;
  public readonly is_blocked_comment: boolean;
  public readonly is_notified_to_user: boolean;
  public readonly thumbnail?: Record<string, unknown>;
  public readonly content: string;
  public readonly source: string;
  public readonly tags: string[];
  public readonly author: IAdmin;
  public readonly categories: ICategory[];
  public readonly views: number;
  public readonly seo?: Record<string, unknown>;
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
    thumbnail_url,
    views,
    source,
    created_at,
    updated_at,
    deleted_at,
    tags,
    is_notified_to_user,
    seo,
    slug,
  }: IPost) {
    this._id = _id;
    this.title = title;
    this.description = description;
    this.thumbnail = thumbnail;
    this.is_blocked_comment = is_blocked_comment;
    this.content = content;
    this.author = author;
    this.categories = categories;
    this.thumbnail_url = thumbnail_url;
    this.views = views;
    this.source = source;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.deleted_at = deleted_at;
    this.tags = tags;
    this.is_notified_to_user = is_notified_to_user;
    this.seo = seo;
    this.slug = slug;
  }
}
