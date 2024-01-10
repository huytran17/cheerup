import IGalleryDb from "../../data-access/interfaces/gallery-db";
import IGallery from "../../database/interfaces/gallery";

export interface ICreateGalleryPayload extends Partial<IGallery> {}

interface ICreateGallery {
  galleryDetails: ICreateGalleryPayload;
}

export type CreateGallery = ({
  galleryDetails,
}: ICreateGallery) => Promise<IGallery>;

export default function makeCreateGallery({
  galleryDb,
}: {
  galleryDb: IGalleryDb;
}): CreateGallery {
  return async function createGallery({ galleryDetails }) {
    return await galleryDb.insert(galleryDetails);
  };
}
