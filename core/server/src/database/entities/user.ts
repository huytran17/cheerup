import IUser from "../interfaces/user";
import Admin from "../entities/admin";

export default class User implements IUser {
  public readonly _id: string;
  public readonly hash_password: string;
  public readonly avatar_url: string;
  public readonly avatar: Record<string, unknown>;
  public readonly email: string;
  public readonly full_name: string;
  public readonly blocked_comment_at: Date;
  public readonly is_blocked_comment: boolean;
  public readonly created_by: Admin;
  public readonly created_at: Date;
  public readonly updated_at: Date;
  public readonly deleted_at: Date;

  constructor({
    _id,
    hash_password,
    avatar,
    email,
    full_name,
    avatar_url,
    is_blocked_comment,
    created_at,
    updated_at,
    deleted_at,
    created_by,
    blocked_comment_at
  }: IUser) {
    this._id = _id;
    this.avatar = avatar;
    this.avatar_url = avatar_url;
    this.hash_password = hash_password;
    this.is_blocked_comment = is_blocked_comment;
    this.full_name = full_name;
    this.email = email;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.deleted_at = deleted_at;
    this.created_by = created_by;
    this.blocked_comment_at = blocked_comment_at;
  }
}
