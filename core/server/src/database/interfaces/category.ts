import Category from "../entities/category";
import Admin from "../entities/admin";

export default interface ICategory {
  _id: string;
  title: string;
  children: Category[];
  created_by: Admin;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}
