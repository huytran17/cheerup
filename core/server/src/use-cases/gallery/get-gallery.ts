import IGallery from "../../database/interfaces/gallery";
import IGalleryDb from "../../data-access/interfaces/gallery-db";

export interface IGetGalleryPayload {
  _id: string;
}

export type GetGallery = ({ _id }: IGetGalleryPayload) => Promise<IGallery>;

export default function makeGetGallery({
  galleryDb,
}: {
  galleryDb: IGalleryDb;
}): GetGallery {
  return async function getGallery({ _id }) {
    return await galleryDb.findById({ _id });
  };
}
