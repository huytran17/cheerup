import IAdminDb from "../../data-access/interfaces/admin-db";
import IAdmin from "../../database/interfaces/admin";

export interface IUpdateAdminPayload extends Partial<IAdmin> {
  [key: string]: any;
}

interface IUpdateAdmin {
  adminDetails: IUpdateAdminPayload;
}

export type UpdateAdmin = ({ adminDetails }: IUpdateAdmin) => Promise<IAdmin>;

export default function makeUpdateAdmin({
  adminDb,
}: {
  adminDb: IAdminDb;
}): UpdateAdmin {
  return async function updateAdmin({ adminDetails }) {
    return await adminDb.update(adminDetails);
  };
}
