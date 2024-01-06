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
  }) => Promise<IPaginatedCommentResult>;
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
  ) => Promise<IPaginatedCommentResult>;
  countByPost: ({ post_id }: { post_id: string }) => Promise<number>;
  findAllByParent: ({
    parent_id,
  }: {
    parent_id: string;
  }) => Promise<IComment[]>;
  insert: (payload: Partial<IComment>) => Promise<IComment>;
  hardDelete: ({ _id }: { _id: string }) => Promise<IComment>;
  update: (payload: Partial<IComment>) => Promise<IComment>;
}

export interface IPaginatedCommentResult {
  data: IComment[];
  pagination: {
    current_page: number | null;
    from: number | null;
    to: number | null;
    per_page: number | null;
    total: number | null;
    total_pages: number | null;
  };
}
