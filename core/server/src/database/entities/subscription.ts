import ISubscription from "../interfaces/subscription";

export default class Subscription implements ISubscription {
  public readonly _id: string;
  public readonly email: string;
  public readonly is_active: boolean;
  public readonly created_at: Date;
  public readonly updated_at: Date;
  public readonly deleted_at: Date;

  constructor({
    _id,
    email,
    is_active,
    created_at,
    updated_at,
    deleted_at,
  }: ISubscription) {
    this._id = _id;
    this.email = email;
    this.is_active = is_active;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.deleted_at = deleted_at;
  }
}
