import User from "../../database/entities/user";
import IUser from "../../database/interfaces/user";
export default interface IUserDb {
  findAllPaginated: ({
    query,
    page,
    entries_per_page,
  }: {
    query: string;
    page: number;
    entries_per_page?: number;
  }) => Promise<PaginatedUserResult | null>;
  findOne: () => Promise<User | null>;
  findById: ({ _id }: { _id: string }) => Promise<User | null>;
  findByEmail: ({ email }: { email: string }) => Promise<User | null>;
  insert: (payload: Partial<IUser>) => Promise<User | null>;
  delete: ({ _id }: { _id: string }) => Promise<User | null>;
  hardDelete: ({ _id }: { _id: string }) => Promise<User | null>;
  update: (updatePayload: Partial<IUser>) => Promise<User | null>;
}

export interface PaginatedUserResult {
  data: User[];
  pagination: {
    current_page: number | null;
    from: number | null;
    to: number | null;
    per_page: number | null;
    total: number | null;
    total_pages: number | null;
  };
}
