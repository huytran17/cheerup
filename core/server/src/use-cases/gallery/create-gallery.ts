import IGalleryDb from "../../data-access/interfaces/gallery-db";
import IGallery from "../../database/interfaces/gallery";

export interface ICreateGallery extends Partial<IGallery> {}

export type CreateGallery = (payload: ICreateGallery) => Promise<IGallery>;

export default function makeCreateGallery({
  galleryDb,
}: {
  galleryDb: IGalleryDb;
}): CreateGallery {
  return async function createGallery(payload) {
    return await galleryDb.insert(payload);
  };
}
