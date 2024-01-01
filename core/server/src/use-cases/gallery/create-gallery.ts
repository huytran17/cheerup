import IGalleryDb from "../../data-access/interfaces/gallery-db";
import IGallery from "../../database/interfaces/gallery";

export interface ICreateGalleryData {
  galleryDetails: Omit<IGallery, "_id">;
}

export type CreateGallery = ({
  galleryDetails,
}: ICreateGalleryData) => Promise<IGallery>;

export default function makeCreateGallery({
  galleryDb,
}: {
  galleryDb: IGalleryDb;
}): CreateGallery {
  return async function createGallery({ galleryDetails }) {
    return await galleryDb.insert(galleryDetails);
  };
}
