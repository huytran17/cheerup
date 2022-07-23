import IUser from "../interfaces/user";

export default class User implements IUser {
  public readonly _id: string;
  public readonly hash_password: string;
  public readonly aws_avatar?: Record<string, unknown>;
  public readonly email: string;
  public readonly full_name: string;
  public readonly created_at: Date;
  public readonly updated_at: Date;
  public readonly deleted_at: Date;

  constructor({
    _id,
    hash_password,
    aws_avatar,
    email,
    full_name,
    created_at,
    updated_at,
    deleted_at,
  }: IUser) {
    this._id = _id;
    this.aws_avatar = aws_avatar;
    this.hash_password = hash_password;
    this.full_name = full_name;
    this.email = email;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.deleted_at = deleted_at;
  }
}
