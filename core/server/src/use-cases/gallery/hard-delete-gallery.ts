import IGallery from "../../database/interfaces/gallery";
import IGalleryDb from "../../data-access/interfaces/gallery-db";

export type HardDeleteGallery = ({ _id }: { _id: string }) => Promise<IGallery>;

export default function makeHardDeleteGallery({
  galleryDb,
}: {
  galleryDb: IGalleryDb;
}): HardDeleteGallery {
  return async function hardDeleteGallery({ _id }) {
    return await galleryDb.hardDelete({ _id });
  };
}
