import IUserDb, {
  IUserAnalyticsData,
} from "../../data-access/interfaces/user-db";

export type IGetUserAnalystics = ({
  distance,
  unit,
}: {
  distance?: number;
  unit?: string;
}) => Promise<IUserAnalyticsData>;

export default function makeGetUserAnalystics({
  userDb,
}: {
  userDb: IUserDb;
}): IGetUserAnalystics {
  return async function getUserAnalystics({
    unit,
    distance,
  }: {
    unit?: string;
    distance?: number;
  }): Promise<IUserAnalyticsData> {
    const data = await userDb.getUserAnalystics({
      distance,
      unit,
    });
    return data;
  };
}
