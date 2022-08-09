import ICategory from "../interfaces/category";
import Admin from "../entities/admin";

export default class Category implements ICategory {
  public readonly _id: string;
  public readonly title: string;
  public readonly children: Category[];
  public readonly created_by: Admin;
  public readonly created_at: Date;
  public readonly updated_at: Date;
  public readonly deleted_at: Date;

  constructor({
    _id,
    title,
    children,
    created_at,
    updated_at,
    deleted_at,
    created_by,
  }: ICategory) {
    this._id = _id;
    this.title = title;
    this.children = children;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.deleted_at = deleted_at;
    this.created_by = created_by;
  }
}
