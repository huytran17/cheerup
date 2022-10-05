import Gallery from "../../database/entities/gallery";
import IGalleryDb from "../../data-access/interfaces/gallery-db";

export type IHardDeleteGallery = ({
  _id,
}: {
  _id: string;
}) => Promise<Gallery | null>;

export default function makeHardDeleteGallery({
  galleryDb,
}: {
  galleryDb: IGalleryDb;
}): IHardDeleteGallery {
  return async function hardDeleteGallery({
    _id,
  }: {
    _id: string;
  }): Promise<Gallery | null> {
    const gallery = await galleryDb.hardDelete({ _id });
    return gallery;
  };
}
