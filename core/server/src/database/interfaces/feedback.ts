import User from "../entities/user";

export default interface IFeeback {
  _id: string;
  title: string;
  content: string;
  email?: string;
  created_by?: User;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}
