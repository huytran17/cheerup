import { map, sortBy } from "lodash";
import mongoose from "mongoose";
import { AnalyssisUnit } from "../constants/analysis-unit";
import User from "../database/entities/user";
import IUser from "../database/interfaces/user";
import IUserDb, {
  IPaginatedUsersResult,
  IUserAnalyticsData,
} from "./interfaces/user-db";

export default function makeUserDb({
  userDbModel,
  moment,
}: {
  userDbModel: mongoose.Model<
    IUser & mongoose.Document,
    Record<string, unknown>
  >;
  moment: any;
}): IUserDb {
  return new (class MongooseUserDb implements IUserDb {
    async getUserAnalystics({
      range = [],
      unit = "day",
    }: {
      range?: string[];
      unit?: string;
    }): Promise<IUserAnalyticsData> {
      const FROM_INDEX = 0;
      const END_INDEX = 1;

      const from_date = range[FROM_INDEX]
        ? moment(range[FROM_INDEX])
        : moment().subtract(1, AnalyssisUnit.YEAR);

      const to_date = moment(range[END_INDEX])
        ? moment(range[END_INDEX])
        : moment();

      const formatted_dates = [];
      const exists_dates = [];
      const total_created_counts = [];
      const total_deleted_counts = [];
      const total_blocked_comment_counts = [];

      const total_count = await userDbModel.countDocuments({
        created_at: {
          $gte: moment(from_date, "yyyy-MM-DD").startOf(unit),
          $lte: moment(to_date, "yyyy-MM-DD").endOf(unit),
        },
      });

      while (from_date.isSameOrBefore(to_date, unit)) {
        let formatted_date = from_date.format("YYYY-MM-DD");

        const format_date_types = {
          [AnalyssisUnit.MONTH]: from_date.format("YYYY-MM"),
          [AnalyssisUnit.YEAR]: from_date.format("YYYY"),
        };

        if (format_date_types[unit]) {
          formatted_date = format_date_types[unit];
        }

        formatted_dates.push(formatted_date);
        exists_dates.push(JSON.parse(JSON.stringify(from_date)));
        from_date.add(1, unit);
      }

      const analysis_promises = exists_dates.map(async (date, index) => {
        const start_of = new Date(moment(date, "yyyy-MM-DD").startOf(unit));
        const end_of = new Date(moment(date, "yyyy-MM-DD").endOf(unit));

        const result = await userDbModel.aggregate([
          {
            $facet: {
              total_created: [
                {
                  $match: {
                    created_at: { $gte: start_of, $lte: end_of },
                  },
                },
                {
                  $count: "total_created_count",
                },
              ],

              total_deleted: [
                {
                  $match: {
                    deleted_at: { $gte: start_of, $lte: end_of },
                  },
                },
                {
                  $count: "total_deleted_count",
                },
              ],

              total_blocked_comment: [
                {
                  $match: {
                    created_at: { $gte: start_of, $lte: end_of },
                    is_blocked_comment: true,
                  },
                },
                {
                  $count: "total_blocked_comment_count",
                },
              ],
            },
          },
        ]);

        result.push({ order: index });

        return result;
      });

      const results = await Promise.all(analysis_promises);
      const sorted_results = sortBy(results, ["order"]);

      for (const result of sorted_results) {
        const total_created_count =
          result[0]?.total_created[0]?.total_created_count || 0;
        total_created_counts.push(total_created_count);

        const total_deleted_count =
          result[0]?.total_deleted[0]?.total_deleted_count || 0;
        total_deleted_counts.push(total_deleted_count);

        const total_blocked_comment_count =
          result[0]?.total_blocked_comment[0]?.total_blocked_comment_count || 0;
        total_blocked_comment_counts.push(total_blocked_comment_count);
      }

      const FIRST_INDEX = 0;
      const LAST_INDEX = total_created_counts.length - 1 || 0;

      const first_created_count = total_created_counts[FIRST_INDEX];
      const last_created_count = total_created_counts[LAST_INDEX];

      const is_increased = last_created_count > first_created_count;
      const is_steady_status = first_created_count === last_created_count;

      const growth_percentage =
        (last_created_count / (first_created_count || 1)) * 100;

      let total_percentage = is_increased
        ? growth_percentage
        : 100 - growth_percentage;

      is_steady_status && (total_percentage = 0);

      const final_growth_percentage = parseFloat(total_percentage.toFixed(2));

      return {
        total_created_counts,
        total_deleted_counts,
        total_blocked_comment_counts,
        formatted_dates,
        total_count,
        growth: {
          is_increased,
          total_percentage: final_growth_percentage,
        },
      };
    }

    async findAll(): Promise<IUser[]> {
      const exists = await userDbModel
        .find()
        .select(
          "-__v -hash_password -tfa_secret -socialite.access_token -socialite.refresh_token"
        )
        .lean({ virtuals: true });

      if (exists) {
        return map(exists, (user) => new User(user));
      }

      return null;
    }

    async findAllPaginated({
      query = "",
      page = 1,
      entries_per_page = 15,
    }: {
      query: string;
      page: number;
      entries_per_page?: number;
    }): Promise<IPaginatedUsersResult> {
      const number_of_entries_to_skip = (page - 1) * entries_per_page;

      const query_conditions = {};

      if (query) {
        query_conditions["$or"] = [
          {
            email: { $regex: ".*" + query + ".*", $options: "si" },
          },
        ];
      }

      const exists = await userDbModel
        .find(query_conditions)
        .select(
          "-__v -hash_password -tfa_secret -socialite.access_token -socialite.refresh_token"
        )
        .skip(number_of_entries_to_skip)
        .limit(entries_per_page)
        .sort({
          created_at: "desc",
        })
        .lean({ virtuals: true });

      const total_count = await userDbModel.countDocuments(query_conditions);

      if (exists) {
        const data = map(exists, (user) => new User(user));

        const from = number_of_entries_to_skip + 1;
        const to = number_of_entries_to_skip + exists.length;
        const total_pages = Math.ceil(total_count / entries_per_page);
        const has_more = to < total_count;

        return {
          data,
          pagination: {
            current_page: page,
            from,
            to,
            per_page: entries_per_page,
            total: total_count,
            total_pages,
            has_more,
          },
        };
      }

      return null;
    }

    async findById({ _id }: { _id: string }): Promise<IUser> {
      const query_conditions = {
        _id,
        deleted_at: { $in: [null, undefined] },
      };

      const exists = await userDbModel
        .findOne(query_conditions)
        .select(
          "-__v -tfa_secret -socialite.access_token -socialite.refresh_token"
        )
        .lean({ virtuals: true });

      if (exists) {
        return new User(exists);
      }

      return null;
    }

    async findSoftDeletedById({ _id }: { _id: string }): Promise<IUser> {
      const query_conditions = {
        _id,
      };

      const exists = await userDbModel
        .findOne(query_conditions)
        .select("-__v")
        .lean({ virtuals: true });

      if (exists) {
        return new User(exists);
      }

      return null;
    }

    async findTfaSecretByEmail({ email }: { email: string }): Promise<IUser> {
      const query_conditions = {
        deleted_at: { $in: [null, undefined] },
        email,
      };

      const exists = await userDbModel
        .findOne(query_conditions)
        .select(
          "_id full_name email tfa_secret created_at updated_at deleted_at"
        )
        .lean({ virtuals: true });

      if (exists) {
        return new User(exists);
      }

      return null;
    }

    async findOne(): Promise<IUser> {
      const query_conditions = {
        deleted_at: { $in: [null, undefined] },
      };

      const exists = await userDbModel
        .findOne(query_conditions)
        .select(
          "-__v -hash_password -tfa_secret -socialite.access_token -socialite.refresh_token"
        )
        .lean({ virtuals: true });

      if (exists) {
        return new User(exists);
      }

      return null;
    }

    async findByEmail({ email }: { email: string }): Promise<IUser> {
      const query_conditions = {
        email,
        deleted_at: { $in: [undefined, null] },
      };

      const exists = await userDbModel
        .findOne(query_conditions)
        .select(
          "-__v -tfa_secret -socialite.access_token -socialite.refresh_token"
        )
        .lean({ virtuals: true });

      if (exists) {
        return new User(exists);
      }

      return null;
    }

    async insert(payload: Partial<IUser>): Promise<IUser> {
      const created = await userDbModel.create(payload);

      if (created) {
        return new User(created);
      }

      return null;
    }

    async delete({ _id }: { _id: string }): Promise<IUser> {
      const deleted = await userDbModel
        .findOneAndUpdate(
          { _id },
          { deleted_at: new Date() },
          { returnDocument: "after" }
        )
        .select("_id")
        .lean({ virtuals: true });

      if (deleted) {
        return new User(deleted);
      }

      return null;
    }

    async hardDelete({ _id }: { _id: string }): Promise<IUser> {
      const exists = await userDbModel.findById({ _id });

      exists && (await exists.deleteOne());

      return null;
    }

    async update(payload: Partial<IUser>): Promise<IUser> {
      const updated = await userDbModel
        .findOneAndUpdate({ _id: payload._id }, payload, {
          returnDocument: "after",
        })
        .select("_id")
        .lean({ virtuals: true });

      if (updated) {
        return new User(updated);
      }

      return null;
    }

    async restore({ _id }: { _id: string }): Promise<IUser> {
      const restored = await userDbModel
        .findOneAndUpdate(
          { _id },
          { deleted_at: null },
          { returnDocument: "after" }
        )
        .select("_id")
        .lean({ virtuals: true });

      if (restored) {
        return new User(restored);
      }

      return null;
    }

    async increaseLoginFailedTimes({ _id }: { _id: string }): Promise<IUser> {
      const updated = await userDbModel.findOneAndUpdate(
        { _id },
        { $inc: { login_failed_times: 1 } },
        { returnDocument: "after" }
      );

      if (updated) {
        return new User(updated);
      }

      return null;
    }

    async resetLoginFailedTimes({ _id }: { _id: string }): Promise<IUser> {
      const updated = await userDbModel.findOneAndUpdate(
        { _id },
        { login_failed_times: 0 },
        { returnDocument: "after" }
      );

      if (updated) {
        return new User(updated);
      }

      return null;
    }

    async insertMany(payload: Partial<IUser>[]): Promise<IUser[]> {
      const users = await userDbModel.insertMany(payload);

      if (users.length) {
        return users.map((user) => new User(user));
      }

      return null;
    }
  })();
}
