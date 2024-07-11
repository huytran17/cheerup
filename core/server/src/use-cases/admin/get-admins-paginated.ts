import IAdminDb from "../../data-access/interfaces/admin-db";
import IAdmin from "../../database/interfaces/admin";

export interface IGetAdminsPaginated {
  query: string;
  page: number;
  entries_per_page: number;
}

export type GetAdminsPaginated = ({
  query,
  page,
  entries_per_page,
}: IGetAdminsPaginated) => Promise<IAdmin[]>;

export default function makeGetAdminsPaginated({
  adminDb,
}: {
  adminDb: IAdminDb;
}): GetAdminsPaginated {
  return async function getAdminsPaginated({ query, page, entries_per_page }) {
    return await adminDb.findAllPaginated({ query, page, entries_per_page });
  };
}
