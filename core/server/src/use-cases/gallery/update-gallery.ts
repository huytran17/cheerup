import IGalleryDb from "../../data-access/interfaces/gallery-db";
import IGallery from "../../database/interfaces/gallery";

export interface IUpdateGalleryPayload extends Partial<IGallery> {}

interface IUpdateGallery {
  galleryDetails: IUpdateGalleryPayload;
}

export type UpdateGallery = ({
  galleryDetails,
}: IUpdateGallery) => Promise<IGallery>;

export default function makeUpdateGallery({
  galleryDb,
}: {
  galleryDb: IGalleryDb;
}): UpdateGallery {
  return async function updateGallery({ galleryDetails }) {
    return await galleryDb.update(galleryDetails);
  };
}
