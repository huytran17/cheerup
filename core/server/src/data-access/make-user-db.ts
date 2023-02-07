import _ from "lodash";
import mongoose from "mongoose";
import IUserDb, {
  PaginatedUserResult,
  IUserAnalyticsData,
} from "./interfaces/user-db";
import User from "../database/entities/user";
import IUser from "../database/interfaces/user";
import { AnalyssisUnit } from "../constants/analysis-unit";

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

      const from_date_formatted = range[FROM_INDEX]
        ? moment(range[FROM_INDEX])
        : moment().subtract(1, AnalyssisUnit.YEAR);

      const to_date_formatted = range[END_INDEX]
        ? moment(range[END_INDEX])
        : moment();
      console.log(
        "-----------------",
        range,
        from_date_formatted,
        to_date_formatted
      );

      const formatted_dates = [];
      const total_created_counts = [];
      const total_deleted_counts = [];
      const total_blocked_comment_counts = [];

      const query_conditions = {};

      const total_count = await userDbModel.countDocuments({
        ...query_conditions,
        created_at: {
          $gte: moment(from_date_formatted, "yyyy-MM-DD").startOf(unit),
          $lte: moment(to_date_formatted, "yyyy-MM-DD").endOf(unit),
        },
      });

      while (from_date_formatted.isSameOrBefore(to_date_formatted, unit)) {
        const date = from_date_formatted.format("YYYY-MM-DD");
        let formatted_date = date;

        switch (unit) {
          case AnalyssisUnit.MONTH:
            formatted_date = from_date_formatted.format("YYYY-MM");
            break;
          case AnalyssisUnit.YEAR:
            formatted_date = from_date_formatted.format("YYYY");
            break;
          default:
            break;
        }

        formatted_dates.push(formatted_date);

        const start_at = moment(from_date_formatted, "yyyy-MM-DD").startOf(
          unit
        );
        const end_at = moment(from_date_formatted, "yyyy-MM-DD").endOf(unit);

        const [
          total_deleted_count,
          total_created_count,
          total_blocked_comment_count,
        ] = await Promise.all([
          userDbModel.countDocuments({
            ...query_conditions,
            deleted_at: {
              $gte: start_at,
              $lte: end_at,
            },
          }),
          userDbModel.countDocuments({
            ...query_conditions,
            created_at: {
              $gte: start_at,
              $lte: end_at,
            },
          }),
          userDbModel.countDocuments({
            ...query_conditions,
            is_blocked_comment: true,
            created_at: {
              $gte: start_at,
              $lte: end_at,
            },
          }),
        ]);

        total_created_counts.push(total_created_count);
        total_deleted_counts.push(total_deleted_count);
        total_blocked_comment_counts.push(total_blocked_comment_count);
        from_date_formatted.add(1, unit);
      }
      return {
        total_created_counts,
        total_deleted_counts,
        total_blocked_comment_counts,
        formatted_dates,
        total_count,
      };
    }

    async findAll(): Promise<User[] | null> {
      let query_conditions = Object.assign({});

      const existing = await userDbModel
        .find(query_conditions)
        .lean({ virtuals: true });

      if (existing) {
        return _.map(existing, (user) => new User(user));
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
    }): Promise<PaginatedUserResult | null> {
      const number_of_entries_to_skip = (page - 1) * entries_per_page;

      const query_conditions = Object.assign({});

      if (query) {
        query_conditions["$or"] = [
          {
            email: { $regex: ".*" + query + ".*", $options: "si" },
          },
        ];
      }

      const existing = await userDbModel
        .find(query_conditions)
        .skip(number_of_entries_to_skip)
        .limit(entries_per_page)
        .sort({
          created_at: "desc",
        })
        .lean({ virtuals: true });

      const total_count = await userDbModel.countDocuments(query_conditions);

      if (existing) {
        const data = _.map(existing, (user) => new User(user));

        const from = page - 1 > 0 ? page - 1 : null;
        const has_more_entries =
          existing.length === entries_per_page &&
          page * entries_per_page !== total_count;
        const to = has_more_entries ? page + 1 : null;
        const total_pages = Math.ceil(total_count / entries_per_page);

        return {
          data,
          pagination: {
            current_page: page,
            from,
            to,
            per_page: entries_per_page,
            total: total_count,
            total_pages,
          },
        };
      }

      return null;
    }

    async findById({
      _id,
      is_include_deleted = true,
    }: {
      _id: string;
      is_include_deleted?: boolean;
    }): Promise<User | null> {
      const query_conditions = {
        deleted_at: { $in: [null, undefined] },
        _id,
      };

      if (is_include_deleted) {
        delete query_conditions.deleted_at;
      }

      const existing = await userDbModel
        .findOne(query_conditions)
        .lean({ virtuals: true });
      if (existing) {
        return new User(existing);
      }
      return null;
    }

    async findOne(): Promise<User | null> {
      const query_conditions = {
        deleted_at: { $in: [null, undefined] },
      };

      const existing = await userDbModel
        .findOne(query_conditions)
        .lean({ virtuals: true });

      if (existing) {
        return new User(existing);
      }

      return null;
    }

    async findByEmail({
      email,
      is_include_deleted = true,
    }: {
      email: string;
      is_include_deleted?: boolean;
    }): Promise<User | null> {
      const query_conditions = {
        email,
        deleted_at: { $in: [undefined, null] },
      };

      if (is_include_deleted) {
        delete query_conditions.deleted_at;
      }

      const existing = await userDbModel.findOne(query_conditions);

      if (existing) {
        return new User(existing);
      }
      return null;
    }

    async insert(payload: Partial<IUser>): Promise<User | null> {
      const updated_payload = payload;

      const result = await userDbModel.create([updated_payload]);
      const updated = await userDbModel
        .findOne({ _id: result[0]?._id })
        .lean({ virtuals: true });

      if (updated) {
        return new User(updated);
      }
      return null;
    }

    async delete({ _id }: { _id: string }): Promise<User | null> {
      const existing = await userDbModel.findOneAndUpdate(
        { _id },
        { deleted_at: new Date() }
      );
      const updated = await userDbModel
        .findOne({ _id })
        .lean({ virtuals: true });
      if (updated) {
        return new User(updated);
      }
      return null;
    }

    async hardDelete({ _id }: { _id: string }): Promise<User | null> {
      const existing = await userDbModel.deleteOne({ _id: _id });
      const updated = await userDbModel
        .findOne({ _id })
        .lean({ virtuals: true });
      if (updated) {
        return new User(updated);
      }
      return null;
    }

    async update(payload: Partial<IUser>): Promise<User | null> {
      const result = await userDbModel
        .findOneAndUpdate({ _id: payload._id }, payload)
        .lean({ virtuals: true });

      const updated = await userDbModel
        .findOne({ _id: result?._id })
        .lean({ virtuals: true });

      if (updated) {
        return new User(updated);
      }

      return null;
    }

    async restore({ _id }: { _id: string }): Promise<User | null> {
      const existing = await userDbModel.findOneAndUpdate(
        { _id },
        { deleted_at: null }
      );

      const updated = await userDbModel
        .findOne({ _id })
        .lean({ virtuals: true });
      if (updated) {
        return new User(updated);
      }
      return null;
    }
  })();
}
