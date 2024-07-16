import { map, sortBy } from "lodash";
import mongoose from "mongoose";
import { AnalyssisUnit } from "../constants/analysis-unit";
import Admin from "../database/entities/admin";
import IAdmin, { AdminType } from "../database/interfaces/admin";
import IAdminDb, {
  IAdminAnalyticsData,
  IPaginatedAdminsResult,
} from "./interfaces/admin-db";

export default function makeAdminDb({
  adminDbModel,
  moment,
}: {
  adminDbModel: mongoose.Model<
    IAdmin & mongoose.Document,
    Record<string, unknown>
  >;
  moment: any;
}): IAdminDb {
  return new (class MongooseAdminDb implements IAdminDb {
    async getAdminAnalystics({
      author_type = AdminType.Owner,
      range = [],
      unit = "day",
    }: {
      author_type?: AdminType;
      range?: string[];
      unit?: string;
    }): Promise<IAdminAnalyticsData> {
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
      const total_post_created_counts = [];
      const total_author_counts = [];
      const total_deleted_counts = [];

      const total_count = await adminDbModel.countDocuments({
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

        const result = await adminDbModel.aggregate([
          {
            $facet: {
              total_post_created: [
                {
                  $match: {
                    created_at: { $gte: start_of, $lte: end_of },
                    type: author_type,
                  },
                },
                {
                  $lookup: {
                    from: "posts",
                    as: "post",
                    let: { author_id: "$_id" },
                    pipeline: [
                      {
                        $match: {
                          $expr: {
                            $and: [
                              { $gte: ["$created_at", start_of] },
                              { $lte: ["$created_at", end_of] },
                              { $eq: ["$author", "$$author_id"] },
                            ],
                          },
                        },
                      },
                      {
                        $count: "total_post_created_count",
                      },
                    ],
                  },
                },
                {
                  $project: {
                    _id: 0,
                    total_post_created_count: {
                      $sum: "$post.total_post_created_count",
                    },
                  },
                },
              ],
              total_author: [
                {
                  $match: {
                    created_at: { $gte: start_of, $lte: end_of },
                    type: author_type,
                  },
                },
                {
                  $count: "total_author_count",
                },
              ],

              total_deleted: [
                {
                  $match: {
                    created_at: { $gte: start_of, $lte: end_of },
                    deleted_at: { $nin: [null, undefined] },
                    type: author_type,
                  },
                },
                {
                  $count: "total_deleted_count",
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
        const total_post_created_count = result[0]?.total_post_created?.reduce(
          (accumulator: number, current_item: any) =>
            accumulator + current_item.total_post_created_count,
          0
        );
        total_post_created_counts.push(total_post_created_count);

        const total_author_count =
          result[0]?.total_author[0]?.total_author_count || 0;
        total_author_counts.push(total_author_count);

        const total_deleted_count =
          result[0]?.total_deleted[0]?.total_deleted_count || 0;
        total_deleted_counts.push(total_deleted_count);
      }

      return {
        total_post_created_counts,
        total_author_counts,
        total_deleted_counts,
        formatted_dates,
        total_count,
      };
    }

    async findAll(): Promise<IAdmin[]> {
      const exists = await adminDbModel
        .find()
        .select("-__v -hash_password")
        .lean({ virtuals: true });

      if (exists) {
        return map(exists, (admin) => new Admin(admin));
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
    }): Promise<IPaginatedAdminsResult> {
      const number_of_entries_to_skip = (page - 1) * entries_per_page;

      const query_conditions = {};

      if (query) {
        query_conditions["$or"] = [
          {
            email: { $regex: ".*" + query + ".*", $options: "si" },
          },
        ];
      }

      const exists = await adminDbModel
        .find(query_conditions)
        .select("-__v -hash_password")
        .skip(number_of_entries_to_skip)
        .limit(entries_per_page)
        .sort({
          created_at: "desc",
        })
        .lean({ virtuals: true });

      const total_count = await adminDbModel.countDocuments(query_conditions);

      if (exists) {
        const data = map(exists, (admin) => new Admin(admin));

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

    async findById({ _id }: { _id: string }): Promise<IAdmin> {
      const query_conditions = {
        _id,
        deleted_at: { $in: [null, undefined] },
      };

      const exists = await adminDbModel
        .findOne(query_conditions)
        .select("-__v")
        .lean({ virtuals: true });

      if (exists) {
        return new Admin(exists);
      }

      return null;
    }

    async findSoftDeletedById({ _id }: { _id: string }): Promise<IAdmin> {
      const query_conditions = {
        _id,
      };

      const exists = await adminDbModel
        .findOne(query_conditions)
        .select("-__v")
        .lean({ virtuals: true });

      if (exists) {
        return new Admin(exists);
      }

      return null;
    }

    async findOne(): Promise<IAdmin> {
      const exists = await adminDbModel
        .findOne()
        .select("-__v -hash_password")
        .lean({ virtuals: true });

      if (exists) {
        return new Admin(exists);
      }

      return null;
    }

    async findByEmail({ email }: { email: string }): Promise<IAdmin> {
      const query_conditions = {
        email,
        deleted_at: { $in: [null, undefined] },
      };

      const exists = await adminDbModel
        .findOne(query_conditions)
        .select("-__v")
        .lean({ virtuals: true });

      if (exists) {
        return new Admin(exists);
      }

      return null;
    }

    async insert(payload: Partial<IAdmin>): Promise<IAdmin> {
      const created = await adminDbModel.create(payload);

      if (created) {
        return new Admin(created);
      }

      return null;
    }

    async delete({ _id }: { _id: string }): Promise<IAdmin> {
      const deleted = await adminDbModel
        .findOneAndUpdate(
          { _id },
          { deleted_at: new Date() },
          { returnDocument: "after" }
        )
        .select("_id")
        .lean({ virtuals: true });

      if (deleted) {
        return new Admin(deleted);
      }
      return null;
    }

    async hardDelete({ _id }: { _id: string }): Promise<IAdmin> {
      const exists = await adminDbModel.findById({ _id });

      exists && (await exists.deleteOne());

      return null;
    }

    async update(payload: Partial<IAdmin>): Promise<IAdmin> {
      const updated = await adminDbModel
        .findOneAndUpdate({ _id: payload._id }, payload, {
          returnDocument: "after",
        })
        .select("-__v -hash_password")
        .lean({ virtuals: true });

      if (updated) {
        return new Admin(updated);
      }

      return null;
    }

    async increaseLoginFailedTimes({ _id }: { _id: string }): Promise<IAdmin> {
      const updated = await adminDbModel.findOneAndUpdate(
        { _id },
        { $inc: { login_failed_times: 1 } },
        { returnDocument: "after" }
      );

      if (updated) {
        return new Admin(updated);
      }

      return null;
    }

    async resetLoginFailedTimes({ _id }: { _id: string }): Promise<IAdmin> {
      const updated = await adminDbModel.findOneAndUpdate(
        { _id },
        { login_failed_times: 0 },
        { returnDocument: "after" }
      );

      if (updated) {
        return new Admin(updated);
      }

      return null;
    }

    async insertMany(payload: Partial<IAdmin>[]): Promise<IAdmin[]> {
      const admins = await adminDbModel.insertMany(payload);

      if (admins.length) {
        return admins.map((admin) => new Admin(admin));
      }

      return null;
    }
  })();
}
