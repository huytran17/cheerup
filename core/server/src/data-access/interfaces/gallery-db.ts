import Gallery from "../../database/entities/gallery";
import IGallery from "../../database/interfaces/gallery";
export default interface IGalleryDb {
  findOne: () => Promise<Gallery>;
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
  ) => Promise<IPaginatedGalleryResult>;
  findAllByParent: ({ parent_id }: { parent_id: string }) => Promise<Gallery[]>;
  findByPost: ({ post_id }: { post_id: string }) => Promise<Gallery[]>;
  findById: ({ _id }: { _id: string }) => Promise<Gallery>;
  findOneByPost: ({ post_id }: { post_id: string }) => Promise<Gallery>;
  insert: (payload: Partial<IGallery>) => Promise<Gallery>;
  hardDelete: ({ _id }: { _id: string }) => Promise<Gallery>;
  update: (updatePayload: Partial<IGallery>) => Promise<Gallery>;
}

export interface IPaginatedGalleryResult {
  data: Gallery[];
  pagination: {
    current_page: number | null;
    from: number | null;
    to: number | null;
    per_page: number | null;
    total: number | null;
    total_pages: number | null;
  };
}
