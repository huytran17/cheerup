import ITwoFactorAuthentication from "../interfaces/two-factor-authentication";

export default class TwoFactorAuthentication
  implements ITwoFactorAuthentication
{
  public readonly _id: string;
  public readonly email: string;
  public readonly code: string;
  public readonly created_at: Date;
  public readonly expire_at: Date;

  constructor({
    _id,
    email,
    code,
    created_at,
    expire_at,
  }: ITwoFactorAuthentication) {
    this._id = _id;
    this.email = email;
    this.code = code;
    this.created_at = created_at;
    this.expire_at = expire_at;
  }
}
