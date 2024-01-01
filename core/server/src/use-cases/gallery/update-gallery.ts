import IGalleryDb from "../../data-access/interfaces/gallery-db";
import IGallery from "../../database/interfaces/gallery";

export interface IUpdateGalleryData {
  galleryDetails: IGallery;
}

export type IUpdateGallery = ({
  galleryDetails,
}: IUpdateGalleryData) => Promise<IGallery>;

export default function makeUpdateGallery({
  galleryDb,
}: {
  galleryDb: IGalleryDb;
}): IUpdateGallery {
  return async function updateGallery({ galleryDetails }) {
    return await galleryDb.update(galleryDetails);
  };
}
