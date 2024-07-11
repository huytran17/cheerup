import IUserDb, {
  IPaginatedUsersResult,
} from "../../data-access/interfaces/user-db";

export interface IGetUsersPaginated {
  query: string;
  page: number;
  entries_per_page: number;
}

export type GetUsersPaginated = ({
  query,
  page,
  entries_per_page,
}: IGetUsersPaginated) => Promise<IPaginatedUsersResult>;

export default function makeGetUsersPaginated({
  userDb,
}: {
  userDb: IUserDb;
}): GetUsersPaginated {
  return async function getUsersPaginated({ query, page, entries_per_page }) {
    return await userDb.findAllPaginated({ query, page, entries_per_page });
  };
}
