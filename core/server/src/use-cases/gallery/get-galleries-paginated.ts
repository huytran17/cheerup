import IGalleryDb, {
  IPaginatedGalleriesResult,
} from "../../data-access/interfaces/gallery-db";

export interface IGetGalleriesPaginatedPayload {
  query: string;
  page: number;
  entries_per_page: number;
  is_parent?: boolean;
}

export type GetGalleriesPaginated = ({
  query,
  page,
  entries_per_page,
  is_parent,
}: IGetGalleriesPaginatedPayload) => Promise<IPaginatedGalleriesResult>;

export default function makeGetGalleriesPaginated({
  galleryDb,
}: {
  galleryDb: IGalleryDb;
}): GetGalleriesPaginated {
  return async function getGalleriesPaginated({
    query,
    page,
    entries_per_page,
    is_parent,
  }) {
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
