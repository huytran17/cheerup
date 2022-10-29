import Gallery from "../../database/entities/gallery";
import IGallery from "../../database/interfaces/gallery";
export default interface IGalleryDb {
  findOne: () => Promise<Gallery | null>;
  findAllPaginated: ({
    query,
    page,
    entries_per_page,
  }: {
    query: string;
    page: number;
    entries_per_page?: number;
  }) => Promise<PaginatedGalleryResult | null>;
  findByPost: ({ post_id }: { post_id: string }) => Promise<Gallery[] | null>;
  findById: ({ _id }: { _id: string }) => Promise<Gallery | null>;
  findOneByPost: ({ post_id }: { post_id: string }) => Promise<Gallery | null>;
  insert: (payload: Partial<IGallery>) => Promise<Gallery | null>;
  hardDelete: ({ _id }: { _id: string }) => Promise<Gallery | null>;
  update: (updatePayload: Partial<IGallery>) => Promise<Gallery | null>;
}

export interface PaginatedGalleryResult {
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
