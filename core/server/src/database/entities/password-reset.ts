import IPasswordReset from "../interfaces/password-reset";

export default class PasswordReset implements IPasswordReset {
  public readonly _id: string;
  public readonly email: string;
  public readonly security_code: string;
  public readonly created_at: Date;
  public readonly expire_at: Date;

  constructor({
    _id,
    email,
    security_code,
    created_at,
    expire_at,
  }: IPasswordReset) {
    this._id = _id;
    this.email = email;
    this.security_code = security_code;
    this.created_at = created_at;
    this.expire_at = expire_at;
  }
}
