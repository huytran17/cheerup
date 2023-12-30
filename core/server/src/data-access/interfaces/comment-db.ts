import Comment from "../../database/entities/comment";
import IComment from "../../database/interfaces/comment";
export default interface ICommentDb {
  findAll: () => Promise<Comment[]>;
  findAllPaginated: ({
    query,
    page,
    entries_per_page,
  }: {
    query: string;
    page: number;
    entries_per_page?: number;
  }) => Promise<IPaginatedCommentResult>;
  findOne: () => Promise<Comment>;
  findById: ({
    _id,
    is_only_parent,
    is_show_children,
  }: {
    _id: string;
    is_only_parent?: boolean;
    is_show_children?: boolean;
  }) => Promise<Comment>;
  findAllByPostPaginated: (
    {
      post_id,
      is_include_deleted,
    }: {
      post_id: string;
      is_include_deleted?: boolean;
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
  findAllByParent: ({ parent_id }: { parent_id: string }) => Promise<Comment[]>;
  insert: (payload: Partial<IComment>) => Promise<Comment>;
  hardDelete: ({ _id }: { _id: string }) => Promise<Comment>;
  update: (payload: Partial<IComment>) => Promise<Comment>;
}

export interface IPaginatedCommentResult {
  data: Comment[];
  pagination: {
    current_page: number | null;
    from: number | null;
    to: number | null;
    per_page: number | null;
    total: number | null;
    total_pages: number | null;
  };
}
