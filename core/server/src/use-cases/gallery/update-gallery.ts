import Gallery from "../../database/entities/gallery";
import IGalleryDb from "../../data-access/interfaces/gallery-db";
import IGallery from "../../database/interfaces/gallery";

export interface IUpdateGalleryData {
  galleryDetails: IGallery;
}

export type IUpdateGallery = ({
  galleryDetails,
}: IUpdateGalleryData) => Promise<Gallery | null>;

export default function makeUpdateGallery({
  galleryDb,
}: {
  galleryDb: IGalleryDb;
}): IUpdateGallery {
  return async function updateGallery({ galleryDetails }) {
    return await galleryDb.update(galleryDetails);
  };
}
