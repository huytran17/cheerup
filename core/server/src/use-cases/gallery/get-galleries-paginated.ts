import IGalleryDb, {
  IPaginatedGalleryResult,
} from "../../data-access/interfaces/gallery-db";

export type IGetGalleriesPaginated = (
  {
    query,
    page,
    entries_per_page,
  }: {
    query: string;
    page: number;
    entries_per_page: number;
  },
  {
    is_parent,
  }: {
    is_parent?: boolean;
  }
) => Promise<IPaginatedGalleryResult | null>;

export default function makeGetGalleriesPaginated({
  galleryDb,
}: {
  galleryDb: IGalleryDb;
}): IGetGalleriesPaginated {
  return async function getGalleriesPaginated(
    { query, page, entries_per_page },
    { is_parent }
  ) {
    const posts = await galleryDb.findAllPaginated(
      {
        query,
        page,
        entries_per_page,
      },
      {
        is_parent,
      }
    );

    return posts;
  };
}
