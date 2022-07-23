import Category from "../entities/category";

export default interface ICategory {
  _id: string;
  title: string;
  children: Category[];
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}
