import IGalleryDb from "../../data-access/interfaces/gallery-db";
import IGallery from "../../database/interfaces/gallery";

export interface IUpdateGalleryData {
  galleryDetails: IGallery;
}

export type UpdateGallery = ({
  galleryDetails,
}: IUpdateGalleryData) => Promise<IGallery>;

export default function makeUpdateGallery({
  galleryDb,
}: {
  galleryDb: IGalleryDb;
}): UpdateGallery {
  return async function updateGallery({ galleryDetails }) {
    return await galleryDb.update(galleryDetails);
  };
}
