import Gallery from "../../database/entities/gallery";
import IGalleryDb from "../../data-access/interfaces/gallery-db";

export type IGetGalleryByPost = ({
  post_id,
}: {
  post_id: string;
}) => Promise<Gallery | null>;

export default function makeGetGalleryByPost({
  galleryDb,
}: {
  galleryDb: IGalleryDb;
}): IGetGalleryByPost {
  return async function getGalleryByPost({
    post_id,
  }: {
    post_id: string;
  }): Promise<Gallery | null> {
    const gallery = await galleryDb.findOneByPost({ post_id });
    return gallery;
  };
}
