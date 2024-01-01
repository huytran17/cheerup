import IGalleryDb, {
  IPaginatedGalleryResult,
} from "../../data-access/interfaces/gallery-db";

export type GetGalleriesPaginated = (
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
) => Promise<IPaginatedGalleryResult>;

export default function makeGetGalleriesPaginated({
  galleryDb,
}: {
  galleryDb: IGalleryDb;
}): GetGalleriesPaginated {
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
