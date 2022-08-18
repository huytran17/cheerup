import Admin from "../entities/admin";

export default interface IUser {
  _id: string;
  hash_password: string;
  full_name?: string;
  avatar?: Record<string, unknown>;
  email: string;
  created_by: Admin;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}
