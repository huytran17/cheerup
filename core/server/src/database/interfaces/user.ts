import Admin from "../entities/admin";

export default interface IUser {
  _id: string;
  hash_password: string;
  full_name?: string;
  avatar: Record<string, unknown>;
  blocked_comment_at: Date;
  is_blocked_comment: boolean;
  is_email_verified: boolean;
  avatar_url: string;
  email: string;
  created_by: Admin;
  email_verified_at: Date;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}
