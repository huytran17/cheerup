import Gallery from "../../database/entities/gallery";
import IGallery from "../../database/interfaces/gallery";
export default interface IGalleryDb {
  findOne: () => Promise<Gallery | null>;
  findByPost: ({ post_id }: { post_id: string }) => Promise<Gallery[] | null>;
  findById: ({ _id }: { _id: string }) => Promise<Gallery | null>;
  findOneByPost: ({ post_id }: { post_id: string }) => Promise<Gallery | null>;
  insert: (payload: Partial<IGallery>) => Promise<Gallery | null>;
  hardDelete: ({ _id }: { _id: string }) => Promise<Gallery | null>;
  update: (updatePayload: Partial<IGallery>) => Promise<Gallery | null>;
}
