export default interface IUser {
  _id: string;
  hash_password: string;
  full_name?: string;
  aws_avatar?: Record<string, unknown>;
  email: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}
