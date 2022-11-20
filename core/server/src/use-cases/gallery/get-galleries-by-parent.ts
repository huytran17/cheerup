import Gallery from "../../database/entities/gallery";
import IGalleryDb from "../../data-access/interfaces/gallery-db";
import { Logger } from "winston";

export type IGetGalleriesByParent = ({
  parent_id,
}: {
  parent_id: string;
}) => Promise<Gallery[] | null>;

export default function makeGetGalleriesByParent({
  galleryDb,
  logger,
}: {
  galleryDb: IGalleryDb;
  logger: Logger;
}): IGetGalleriesByParent {
  return async function getGalleriesByParent({
    parent_id,
  }: {
    parent_id: string;
  }): Promise<Gallery[] | null> {
    const galleries = await galleryDb.findAllByParent({ parent_id });
    return galleries;
  };
}
