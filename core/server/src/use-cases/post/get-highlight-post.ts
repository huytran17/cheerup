import Post from "../../database/entities/post";
import IPostDb from "../../data-access/interfaces/post-db";
import { Logger } from "winston";

export type IGetHighlightPost = () => Promise<Post | null>;

export default function makeGetHighlightPost({
  postDb,
  logger,
}: {
  postDb: IPostDb;
  logger: Logger;
}): IGetHighlightPost {
  return async function getHighlightPost(): Promise<Post | null> {
    const post = await postDb.findHighlight();
    return post;
  };
}
