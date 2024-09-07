import IGalleryDb from "../../data-access/interfaces/gallery-db";
import IGallery from "../../database/interfaces/gallery";

export interface IUpdateGallery extends Partial<IGallery> {}

export type UpdateGallery = (payload: IUpdateGallery) => Promise<IGallery>;

export default function makeUpdateGallery({
  galleryDb,
}: {
  galleryDb: IGalleryDb;
}): UpdateGallery {
  return async function updateGallery(payload) {
    return await galleryDb.update(payload);
  };
}
