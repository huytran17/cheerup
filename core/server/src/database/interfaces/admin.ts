export default interface IAdmin {
  _id: string;
  hash_password: string;
  full_name: string;
  avatar_url?: string;
  avatar?: Record<string, unknown>;
  email: string;
  type: AdminType;
  is_auto_censorship_post?: boolean;
  email_verified_at?: Date;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}

export enum AdminType {
  Super = "super",
  Normal = "normal",
}
