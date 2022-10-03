import Gallery from "../../database/entities/gallery";
import IGalleryDb from "../../data-access/interfaces/gallery-db";
import { Logger } from "winston";

export type IGetGalleriesByPost = ({
  post_id,
}: {
  post_id: string;
}) => Promise<Gallery[] | null>;

export default function makeGetGalleriesByPost({
  galleryDb,
  logger,
}: {
  galleryDb: IGalleryDb;
  logger: Logger;
}): IGetGalleriesByPost {
  return async function getGalleriesByPost({
    post_id,
  }: {
    post_id: string;
  }): Promise<Gallery[] | null> {
    const galleries = await galleryDb.findByPost({ post_id });
    return galleries;
  };
}
