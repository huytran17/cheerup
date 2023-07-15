import Admin from "../entities/admin";

export default interface IUser {
  _id: string;
  ip?: string;
  hash_password?: string;
  full_name: string;
  avatar?: Record<string, unknown>;
  blocked_comment_at?: Date;
  is_blocked_comment?: boolean;
  is_enabled_2fa?: boolean;
  avatar_url?: string;
  email: string;
  socialite?: {
    provider?: string;
    access_token?: string;
    refresh_token?: string;
  };
  created_by?: Admin;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}
