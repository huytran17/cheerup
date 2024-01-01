import IGallery from "../../database/interfaces/gallery";
import IGalleryDb from "../../data-access/interfaces/gallery-db";

export type GetGallery = ({ _id }: { _id: string }) => Promise<IGallery>;

export default function makeGetGallery({
  galleryDb,
}: {
  galleryDb: IGalleryDb;
}): GetGallery {
  return async function getGallery({ _id }) {
    return await galleryDb.findById({ _id });
  };
}
