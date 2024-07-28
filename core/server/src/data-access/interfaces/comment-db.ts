import IComment from "../../database/interfaces/comment";
export default interface ICommentDb {
  findAll: () => Promise<IComment[]>;
  findAllPaginated: ({
    query,
    page,
    entries_per_page,
  }: {
    query: string;
    page: number;
    entries_per_page?: number;
  }) => Promise<IPaginatedCommentsResult>;
  findOne: () => Promise<IComment>;
  findById: ({
    _id,
    is_only_parent,
    is_show_children,
  }: {
    _id: string;
    is_only_parent?: boolean;
    is_show_children?: boolean;
  }) => Promise<IComment>;
  findAllByPostPaginated: (
    {
      post_id,
    }: {
      post_id: string;
    },
    {
      query,
      page,
      entries_per_page,
    }: {
      query: string;
      page: number;
      entries_per_page: number;
    }
  ) => Promise<IPaginatedCommentsResult>;
  countByPost: ({ post_id }: { post_id: string }) => Promise<number>;
  findAllByParent: ({ _id }: { _id: string }) => Promise<IComment[]>;
  insert: (payload: Partial<IComment>) => Promise<IComment>;
  hardDelete: ({ _id }: { _id: string }) => Promise<IComment>;
  update: (payload: Partial<IComment>) => Promise<IComment>;
}

export interface IPaginatedCommentsResult {
  data: IComment[];
  pagination: IPagination;
}
