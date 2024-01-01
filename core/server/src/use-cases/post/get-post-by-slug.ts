import IPost from "../../database/interfaces/post";
import IPostDb from "../../data-access/interfaces/post-db";

export type GetPostBySlug = ({ slug }: { slug: string }) => Promise<IPost>;

export default function makeGetPostBySlug({
  postDb,
}: {
  postDb: IPostDb;
}): GetPostBySlug {
  return async function getPostBySlug({ slug }) {
    return await postDb.findBySlug({ slug });
  };
}
