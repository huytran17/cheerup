import Gallery from "../../database/entities/gallery";
import IGalleryDb from "../../data-access/interfaces/gallery-db";
import { Logger } from "winston";

export type IGetGallery = ({ _id }: { _id: string }) => Promise<Gallery | null>;

export default function makeGetGallery({
  galleryDb,
  logger,
}: {
  galleryDb: IGalleryDb;
  logger: Logger;
}): IGetGallery {
  return async function getGallery({
    _id,
  }: {
    _id: string;
  }): Promise<Gallery | null> {
    const gallery = await galleryDb.findById({ _id });
    return gallery;
  };
}
