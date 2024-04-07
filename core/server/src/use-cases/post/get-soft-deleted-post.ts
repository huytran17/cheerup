import IPost from "../../database/interfaces/post";
import IPostDb from "../../data-access/interfaces/post-db";

export interface IGetSoftDeletedPostPayload {
  _id: string;
}

export type GetSoftDeletedPost = ({
  _id,
}: IGetSoftDeletedPostPayload) => Promise<IPost>;

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
