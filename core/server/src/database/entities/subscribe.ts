import ISubscribe from "../interfaces/subscribe";
import User from "./user";

export default class Subscribe implements ISubscribe {
  public readonly _id: string;
  public readonly user: User;
  public readonly is_active: boolean;
  public readonly created_at: Date;
  public readonly updated_at: Date;
  public readonly deleted_at: Date;

  constructor({
    _id,
    user,
    is_active,
    created_at,
    updated_at,
    deleted_at,
  }: ISubscribe) {
    this._id = _id;
    this.user = user;
    this.is_active = is_active;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.deleted_at = deleted_at;
  }
}
