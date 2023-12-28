import Gallery from "../../database/entities/gallery";
import IGalleryDb from "../../data-access/interfaces/gallery-db";

export type IGetGallery = ({ _id }: { _id: string }) => Promise<Gallery | null>;

export default function makeGetGallery({
  galleryDb,
}: {
  galleryDb: IGalleryDb;
}): IGetGallery {
  return async function getGallery({ _id }) {
    return await galleryDb.findById({ _id });
  };
}
