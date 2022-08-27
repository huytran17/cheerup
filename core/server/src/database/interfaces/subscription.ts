export default interface ISubscription {
  _id: string;
  is_active: boolean;
  email: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}
