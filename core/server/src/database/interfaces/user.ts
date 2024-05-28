import IAdmin from "./admin";

export default interface IUser {
  _id: string;
  ip?: string;
  hash_password: string;
  full_name: string;
  avatar?: Record<string, unknown>;
  blocked_comment_at?: Date;
  is_blocked_comment?: boolean;
  is_online?: boolean;
  is_enabled_2fa?: boolean;
  avatar_url?: string;
  email: string;
  tfa_secret?: string;
  socialite?: {
    provider?: string;
  };
  login_failed_times: number;
  created_by?: IAdmin;
  last_online_at?: Date;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}
