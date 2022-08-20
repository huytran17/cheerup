import IAdminDb, {
  IAdminAnalyticsData,
} from "../../data-access/interfaces/admin-db";

export type IGetAdminAnalystics = ({
  distance,
  unit,
}: {
  distance?: number;
  unit?: string;
}) => Promise<IAdminAnalyticsData>;

export default function makeGetAdminAnalystics({
  adminDb,
}: {
  adminDb: IAdminDb;
}): IGetAdminAnalystics {
  return async function getAdminAnalystics({
    unit,
    distance,
  }: {
    unit?: string;
    distance?: number;
  }): Promise<IAdminAnalyticsData> {
    const data = await adminDb.getAdminAnalystics({ distance, unit });
    return data;
  };
}
