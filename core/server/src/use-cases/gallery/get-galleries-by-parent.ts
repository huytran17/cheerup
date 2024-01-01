import IGallery from "../../database/interfaces/gallery";
import IGalleryDb from "../../data-access/interfaces/gallery-db";

export type IGetGalleriesByParent = ({
  parent_id,
}: {
  parent_id: string;
}) => Promise<IGallery[]>;

export default function makeGetGalleriesByParent({
  galleryDb,
}: {
  galleryDb: IGalleryDb;
}): IGetGalleriesByParent {
  return async function getGalleriesByParent({ parent_id }) {
    return await galleryDb.findAllByParent({ parent_id });
  };
}
