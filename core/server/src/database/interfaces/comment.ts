import IUser from "./user";
import IPost from "./post";

export default interface IComment {
  _id: string;
  content: string;
  user: IUser;
  post: IPost;
  children: IComment[];
  parent: IComment;
  is_parent: boolean;
  has_children: boolean;
  created_at: Date;
  updated_at: Date;
}
