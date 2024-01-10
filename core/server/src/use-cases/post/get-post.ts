import IPost from "../../database/interfaces/post";
import IPostDb from "../../data-access/interfaces/post-db";

export interface IGetPostPayload {
  _id: string;
}

export type GetPost = ({ _id }: IGetPostPayload) => Promise<IPost>;

export default function makeGetPost({ postDb }: { postDb: IPostDb }): GetPost {
  return async function getPost({ _id }) {
    return await postDb.findById({
      _id,
    });
  };
}
