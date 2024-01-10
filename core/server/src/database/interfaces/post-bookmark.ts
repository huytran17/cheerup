import IPost from "./post";
import IUser from "./user";

export default interface IPostBookmark {
  _id: string;
  post: IPost;
  user: IUser;
  created_at: Date;
  updated_at: Date;
}
