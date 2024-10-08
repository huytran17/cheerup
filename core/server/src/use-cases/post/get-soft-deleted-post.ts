import IPost from "../../database/interfaces/post";
import IPostDb from "../../data-access/interfaces/post-db";

export interface IGetSoftDeletedPost {
  _id: string;
}

export type GetSoftDeletedPost = ({
  _id,
}: IGetSoftDeletedPost) => Promise<IPost>;

export default function makeGetSoftDeletedPost({
  postDb,
}: {
  postDb: IPostDb;
}): GetSoftDeletedPost {
  return async function getSoftDeletedPost({ _id }) {
    return await postDb.findSoftDeletedById({
      _id,
    });
  };
}
