import IFeeback from "../interfaces/feedback";
import User from "../entities/user";

export default class Feeback implements IFeeback {
  public readonly _id: string;
  public readonly created_by: User;
  public readonly title: string;
  public readonly content: string;
  public readonly created_at: Date;
  public readonly updated_at: Date;
  public readonly deleted_at: Date;

  constructor({
    _id,
    created_by,
    title,
    content,
    created_at,
    updated_at,
    deleted_at,
  }: IFeeback) {
    this._id = _id;
    this.created_by = created_by;
    this.title = title;
    this.content = content;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.deleted_at = deleted_at;
  }
}
