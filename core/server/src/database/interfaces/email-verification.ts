export default interface IEmailVerification {
  _id: string;
  verification_code: string;
  expire_at: Date;
  email: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}
