export default interface ITwoFactorAuthentication {
  _id: string;
  email: string;
  code: string;
  created_at: Date;
  expire_at: Date;
}
