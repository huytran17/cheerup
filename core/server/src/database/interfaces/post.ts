import Admin from "../entities/admin";
import Category from "../entities/category";

export default interface IPost {
  _id: string;
  title: string;
  description: string;
  source: string;
  thumbnail_url: string;
  is_blocked_comment: boolean;
  is_published: boolean;
  thumbnail: Record<string, unknown>;
  content: string;
  author: Admin;
  categories: Category[];
  meta: {
    views: number;
  };
  created_by: Admin;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}
