import Post from "../entities/post";
import User from "../entities/user";

export default interface IPostBookmark {
  _id: string;
  post: Post;
  user: User;
  created_at: Date;
  updated_at: Date;
}
