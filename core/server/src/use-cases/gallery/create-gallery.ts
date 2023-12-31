import Gallery from "../../database/entities/gallery";
import IGalleryDb from "../../data-access/interfaces/gallery-db";
import IGallery from "../../database/interfaces/gallery";

export interface ICreateGalleryData {
  galleryDetails: Omit<IGallery, "_id">;
}

export type ICreateGallery = ({
  galleryDetails,
}: ICreateGalleryData) => Promise<Gallery>;

export default function makeCreateGallery({
  galleryDb,
}: {
  galleryDb: IGalleryDb;
}): ICreateGallery {
  return async function createGallery({ galleryDetails }) {
    return await galleryDb.insert(galleryDetails);
  };
}
