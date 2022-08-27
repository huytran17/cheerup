import IPostDb, {
  IPostAnalyticsData,
} from "../../data-access/interfaces/post-db";

export type IGetPostAnalystics = ({
  distance,
  unit,
}: {
  distance?: number;
  unit?: string;
}) => Promise<IPostAnalyticsData>;

export default function makeGetPostAnalystics({
  postDb,
}: {
  postDb: IPostDb;
}): IGetPostAnalystics {
  return async function getPostAnalystics({
    unit,
    distance,
  }: {
    unit?: string;
    distance?: number;
  }): Promise<IPostAnalyticsData> {
    const data = await postDb.getPostAnalystics({ distance, unit });
    return data;
  };
}
