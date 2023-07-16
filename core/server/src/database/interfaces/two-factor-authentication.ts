export default interface ITwoFactorAuthentication {
  _id: string;
  email: string;
  code: string;
  type: TwoFAType;
  created_at: Date;
  expire_at: Date;
}

export enum TwoFAType {
  ENABLE = "enable",
  DISABLE = "disable",
}
