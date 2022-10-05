import Gallery from "../../database/entities/gallery";
import IGalleryDb from "../../data-access/interfaces/gallery-db";
import IGallery from "../../database/interfaces/gallery";

export interface IUpdateGalleryData {
  galleryDetails: Omit<IGallery, "_id">;
}

export type IUpdateGallery = ({
  galleryDetails,
}: IUpdateGalleryData) => Promise<Gallery | null>;

export default function makeUpdateGallery({
  galleryDb,
}: {
  galleryDb: IGalleryDb;
}): IUpdateGallery {
  return async function updateGallery({
    galleryDetails,
  }: IUpdateGalleryData): Promise<Gallery | null> {
    const gallery = await galleryDb.update(galleryDetails);
    return gallery;
  };
}
