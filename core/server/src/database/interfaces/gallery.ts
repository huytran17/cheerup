import Post from "../entities/post";
import User from "../entities/user";
import Admin from "../entities/admin";

export default interface IGallery {
  _id: string;
  post: Post;
  model_type: ModelType;
  items: { s3: Record<string, unknown> }[];
  created_by: Admin | User;
  created_at: Date;
  updated_at: Date;
}

export enum ModelType {
  Admin = "Admin",
  User = "User",
}
