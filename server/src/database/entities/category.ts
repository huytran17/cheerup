import ICategory from "../interfaces/category";

export default class Category implements ICategory {
  public readonly _id: string;
  public readonly title: string;
  public readonly children: Category[];
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
  }: ICategory) {
    this._id = _id;
    this.title = title;
    this.children = children;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.deleted_at = deleted_at;
  }
}
