import Admin from "../entities/admin";

export default interface IGallery {
  _id: string;
  name: string;
  items: { s3: Record<string, unknown> }[];
  uploaded_by: Admin;
  created_at: Date;
  updated_at: Date;
}

export enum ModelType {
  Admin = "Admin",
  User = "User",
}
