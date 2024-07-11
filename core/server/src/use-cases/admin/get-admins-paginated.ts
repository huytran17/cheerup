import IAdminDb from "../../data-access/interfaces/admin-db";
import IAdmin from "../../database/interfaces/admin";

export interface IGetAdminPaginated {
  query: string;
  page: number;
  entries_per_page: number;
}

export type GetAdminPaginated = ({
  query,
  page,
  entries_per_page,
}: IGetAdminPaginated) => Promise<IAdmin[]>;

export default function makeGetAdminsPaginated({
  adminDb,
}: {
  adminDb: IAdminDb;
}) {
  return async function getAdminsPaginated({ query, page, entries_per_page }) {
    return await adminDb.findAllPaginated({ query, page, entries_per_page });
  };
}
