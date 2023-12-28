import Post from "../../database/entities/post";
import IPostDb from "../../data-access/interfaces/post-db";

export type IGetPostBySlug = ({
  slug,
}: {
  slug: string;
}) => Promise<Post | null>;

export default function makeGetPostBySlug({
  postDb,
}: {
  postDb: IPostDb;
}): IGetPostBySlug {
  return async function getPostBySlug({ slug }) {
    return await postDb.findBySlug({ slug });
  };
}
