import Admin from "../entities/admin";
import Category from "../entities/category";

export default interface IPost {
  _id: string;
  title: string;
  description: string;
  source: string;
  thumbnail_url?: string;
  is_blocked_comment: boolean;
  is_highlight: boolean;
  is_published: boolean;
  is_notified_to_user: boolean;
  thumbnail?: Record<string, unknown>;
  content: string;
  tags: string[];
  author: Admin;
  categories: Category[];
  views: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}
