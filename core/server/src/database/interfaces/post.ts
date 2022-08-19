import Admin from "../entities/admin";
import Category from "../entities/category";

export default interface IPost {
  _id: string;
  title: string;
  description: string;
  source: string;
  is_blocked_comment: boolean;
  thumbnail: Record<string, unknown>;
  content: string;
  author: Admin;
  categories: Category[];
  meta: {
    views: number;
  };
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}
