export default interface IAdmin {
  _id: string;
  hash_password: string;
  full_name: string;
  avatar_url: string;
  avatar: Record<string, unknown>;
  email: string;
  is_auto_censorship_post: boolean;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}

export enum AdminType {
  Super = "super",
  Normal = "normal",
}
