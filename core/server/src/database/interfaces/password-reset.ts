export default interface IPasswordReset {
  _id: string;
  email: string;
  security_code: string;
  created_at: Date;
  expire_at: Date;
}
