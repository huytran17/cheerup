import IEmailVerification from "../interfaces/email-verification";

export default class EmailVerification implements IEmailVerification {
  public readonly _id: string;
  public readonly email: string;
  public readonly verification_code: string;
  public readonly expire_at: string;
  public readonly created_at: Date;
  public readonly updated_at: Date;
  public readonly deleted_at: Date;

  constructor({
    _id,
    email,
    verification_code,
    expire_at,
    created_at,
    updated_at,
    deleted_at,
  }: IEmailVerification) {
    this._id = _id;
    this.email = email;
    this.verification_code = verification_code;
    this.expire_at = expire_at;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.deleted_at = deleted_at;
  }
}
