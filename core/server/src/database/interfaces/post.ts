import Admin from "../entities/admin";
import Category from "../entities/category";

export default interface IPost {
  _id: string;
  title: string;
  description: string;
  source: string;
  thumbnail_url?: string;
  is_blocked_comment: boolean;
  is_published: boolean;
  is_notified_to_user: boolean;
  thumbnail?: Record<string, unknown>;
  content: string;
  tags: string[];
  author: Admin;
  published_by: Admin;
  categories: Category[];
  views: number;
  seo?: Record<string, unknown>;
  published_at: Date;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}
