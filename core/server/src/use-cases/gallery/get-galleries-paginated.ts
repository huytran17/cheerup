import { Logger } from "winston";
import IGalleryDb, {
  PaginatedGalleryResult,
} from "../../data-access/interfaces/gallery-db";

export type IGetGalleriesPaginated = (
  { name, item_name }: { name?: string; item_name?: string },
  {
    query,
    page,
    entries_per_page,
  }: {
    query: string;
    page: number;
    entries_per_page: number;
  }
) => Promise<PaginatedGalleryResult | null>;

export default function makeGetGalleriesPaginated({
  galleryDb,
  logger,
}: {
  galleryDb: IGalleryDb;
  logger: Logger;
}): IGetGalleriesPaginated {
  return async function getGalleriesPaginated(
    {
      name,
      item_name,
    }: {
      name?: string;
      item_name?: string;
    },
    {
      query,
      page,
      entries_per_page,
    }: {
      query: string;
      page: number;
      entries_per_page: number;
    }
  ): Promise<PaginatedGalleryResult | null> {
    const posts = await galleryDb.findAllPaginated(
      { name, item_name },
      {
        query,
        page,
        entries_per_page,
      }
    );

    return posts;
  };
}
