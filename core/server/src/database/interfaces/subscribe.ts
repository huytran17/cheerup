import User from "../entities/user";

export default interface ISubscribe {
  _id: string;
  is_active: boolean;
  user: User;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}
