import IAdmin, { AdminType } from "../interfaces/admin";

export default class Admin implements IAdmin {
  public readonly _id: string;
  public readonly hash_password: string;
  public readonly avatar_url?: string;
  public readonly avatar?: Record<string, unknown>;
  public readonly email: string;
  public readonly type: AdminType;
  public readonly full_name: string;
  public readonly is_blocked?: boolean;
  public readonly created_at: Date;
  public readonly updated_at: Date;
  public readonly deleted_at: Date;

  constructor({
    _id,
    hash_password,
    avatar,
    email,
    full_name,
    type,
    avatar_url,
    is_blocked,
    created_at,
    updated_at,
    deleted_at,
  }: IAdmin) {
    this._id = _id;
    this.avatar = avatar;
    this.avatar_url = avatar_url;
    this.hash_password = hash_password;
    this.full_name = full_name;
    this.is_blocked = is_blocked;
    this.email = email;
    this.type = type;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.deleted_at = deleted_at;
  }
}
