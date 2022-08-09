import Admin from "../entities/admin";
import Category from "../entities/category";

export default interface IPost {
  _id: string;
  title: string;
  description: string;
  thumbnail: Record<string, unknown>;
  content: string;
  author: Admin;
  category: Category;
  meta: {
    views: number;
  };
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}
