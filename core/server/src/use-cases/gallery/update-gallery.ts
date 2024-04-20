import IGalleryDb from "../../data-access/interfaces/gallery-db";
import IGallery from "../../database/interfaces/gallery";

export interface IUpdateGalleryPayload extends Partial<IGallery> {}

export type UpdateGallery = (
  payload: IUpdateGalleryPayload
) => Promise<IGallery>;

export default function makeUpdateGallery({
  galleryDb,
}: {
  galleryDb: IGalleryDb;
}): UpdateGallery {
  return async function updateGallery(payload) {
    return await galleryDb.update(payload);
  };
}
