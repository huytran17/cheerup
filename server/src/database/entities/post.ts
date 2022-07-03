import IPost from "../interfaces/post";
import User from "../entities/user";
import Category from "../entities/category";

export default class Post implements IPost {
  public readonly _id: string;
  public readonly title: string;
  public readonly description: string;
  public readonly thumbnail: Record<string, unknown>;
  public readonly content: string;
  public readonly author: User;
  public readonly category: Category;
  public readonly meta: Record<string, unknown>;
  public readonly created_at: Date;
  public readonly updated_at: Date;
  public readonly deleted_at: Date;
}
