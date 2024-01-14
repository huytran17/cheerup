import { sortBy, map } from "lodash";
import mongoose from "mongoose";
import Subscription from "../database/entities/subscription";
import ISubscription from "../database/interfaces/subscription";
import ISubscriptionDb, {
  ISubscriptionAnalyticsData,
  IPaginatedSubscriptionResult,
} from "./interfaces/subscription-db";
import { AnalyssisUnit } from "../constants/analysis-unit";

export default function makeSubscriptionDb({
  subscriptionDbModel,
  moment,
}: {
  subscriptionDbModel: mongoose.Model<
    ISubscription & mongoose.Document,
    Record<string, unknown>
  >;
  moment: any;
}): ISubscriptionDb {
  return new (class MongooseSubscriptionDb implements ISubscriptionDb {
    async getSubscriptionAnalystics({
      range = [],
      unit = "day",
    }: {
      range?: string[];
      unit?: string;
    }): Promise<ISubscriptionAnalyticsData> {
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
      const total_active_counts = [];

      const total_count = await subscriptionDbModel.countDocuments({
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

        const result = await subscriptionDbModel.aggregate([
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

              total_active: [
                {
                  $match: {
                    deleted_at: { $in: [null, undefined] },
                    is_active: true,
                  },
                },
                {
                  $count: "total_active_count",
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

        const total_active_count =
          result[0]?.total_created[0]?.total_active_count || 0;
        total_active_counts.push(total_active_count);
      }

      return {
        total_created_counts,
        total_active_counts,
        formatted_dates,
        total_count,
      };
    }

    async findAll(): Promise<ISubscription[]> {
      const exists = await subscriptionDbModel
        .find()
        .select("-__v")
        .lean({ virtuals: true });

      if (exists) {
        return map(exists, (subscription) => new Subscription(subscription));
      }

      return null;
    }
    async findAllActivating(): Promise<ISubscription[]> {
      const query_conditions = {
        is_active: true,
      };

      const exists = await subscriptionDbModel
        .find(query_conditions)
        .select("-__v")
        .lean({ virtuals: true });

      if (exists) {
        return map(exists, (subscription) => new Subscription(subscription));
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
    }): Promise<IPaginatedSubscriptionResult> {
      const number_of_entries_to_skip = (page - 1) * entries_per_page;

      const query_conditions = {};

      if (query) {
        query_conditions["$or"] = [
          {
            email: { $regex: ".*" + query + ".*", $options: "si" },
          },
        ];
      }

      const exists = await subscriptionDbModel
        .find(query_conditions)
        .select("-__v")
        .skip(number_of_entries_to_skip)
        .limit(entries_per_page)
        .sort({
          created_at: "desc",
        })
        .lean({ virtuals: true });

      const total_count = await subscriptionDbModel.countDocuments(
        query_conditions
      );

      if (exists) {
        const data = map(
          exists,
          (subscription) => new Subscription(subscription)
        );

        const from = page - 1 > 0 ? page - 1 : null;
        const has_more_entries =
          exists.length === entries_per_page &&
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

    async findById({ _id }: { _id: string }): Promise<ISubscription> {
      const query_conditions = {
        _id,
        deleted_at: { $in: [null, undefined] },
      };

      const exists = await subscriptionDbModel
        .findOne(query_conditions)
        .select("-__v")
        .lean({ virtuals: true });

      if (exists) {
        return new Subscription(exists);
      }

      return null;
    }

    async findByEmail({ email }: { email: string }): Promise<ISubscription> {
      const query_conditions = {
        email,
        deleted_at: { $in: [null, undefined] },
      };

      const exists = await subscriptionDbModel
        .findOne(query_conditions)
        .select("-__v")
        .lean({ virtuals: true });

      if (exists) {
        return new Subscription(exists);
      }

      return null;
    }

    async findOne(): Promise<ISubscription> {
      const exists = await subscriptionDbModel
        .findOne()
        .select("-__v")
        .lean({ virtuals: true });

      if (exists) {
        return new Subscription(exists);
      }

      return null;
    }

    async insert(payload: Partial<ISubscription>): Promise<ISubscription> {
      const created = await subscriptionDbModel.create(payload);

      if (created) {
        return new Subscription(created);
      }

      return null;
    }

    async delete({ _id }: { _id: string }): Promise<ISubscription> {
      const deleted = await subscriptionDbModel
        .findOneAndUpdate({ _id }, { deleted_at: new Date() })
        .select("-__v")
        .lean({ virtuals: true });

      if (deleted) {
        return new Subscription(deleted);
      }

      return null;
    }

    async hardDelete({ _id }: { _id: string }): Promise<ISubscription> {
      const deleted = await subscriptionDbModel
        .findByIdAndDelete({ _id })
        .select("-__v")
        .lean({ virtuals: true });

      if (deleted) {
        return new Subscription(deleted);
      }

      return null;
    }

    async update(payload: Partial<ISubscription>): Promise<ISubscription> {
      const updated = await subscriptionDbModel
        .findOneAndUpdate({ _id: payload._id }, payload)
        .select("-__v")
        .lean({ virtuals: true });

      if (updated) {
        return new Subscription(updated);
      }

      return null;
    }
  })();
}
