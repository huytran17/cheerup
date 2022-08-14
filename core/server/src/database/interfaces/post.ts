import Admin from "../entities/admin";
import Category from "../entities/category";

export default interface IPost {
  _id: string;
  title: string;
  description: string;
  is_block_comment: boolean;
  thumbnail: Record<string, unknown>;
  content: string;
  author: Admin;
  last_deleted_by: Admin;
  last_restored_by: Admin;
  last_restored_at: Date;
  category: Category;
  meta: {
    views: number;
  };
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}
