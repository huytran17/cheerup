import User from "../entities/user";
import Category from "../entities/category";

export default interface IPost {
  _id: string;
  title: string;
  description?: string;
  thumbnail?: Record<string, unknown>;
  content: string;
  author: User;
  category: Category;
  meta: Record<string, unknown>;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}
