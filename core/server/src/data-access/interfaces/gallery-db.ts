import IGallery from "../../database/interfaces/gallery";
export default interface IGalleryDb {
  findOne: () => Promise<IGallery>;
  findAllPaginated: (
    {
      query,
      page,
      entries_per_page,
    }: {
      query: string;
      page: number;
      entries_per_page?: number;
    },
    {
      is_parent,
    }: {
      is_parent?: boolean;
    }
  ) => Promise<IPaginatedGalleriesResult>;
  findAllByParent: ({
    parent_id,
  }: {
    parent_id: string;
  }) => Promise<IGallery[]>;
  findByPost: ({ post_id }: { post_id: string }) => Promise<IGallery[]>;
  findById: ({ _id }: { _id: string }) => Promise<IGallery>;
  findOneByPost: ({ post_id }: { post_id: string }) => Promise<IGallery>;
  insert: (payload: Partial<IGallery>) => Promise<IGallery>;
  hardDelete: ({ _id }: { _id: string }) => Promise<IGallery>;
  update: (payload: Partial<IGallery>) => Promise<IGallery>;
}

export interface IPaginatedGalleriesResult {
  data: IGallery[];
  pagination: IPagination;
}
