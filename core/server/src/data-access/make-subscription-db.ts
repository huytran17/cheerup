import { sortBy, map, merge } from "lodash";
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
      const existing_dates = [];
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

        switch (unit) {
          case AnalyssisUnit.MONTH:
            formatted_date = from_date.format("YYYY-MM");
            break;
          case AnalyssisUnit.YEAR:
            formatted_date = from_date.format("YYYY");
            break;
          default:
            break;
        }

        formatted_dates.push(formatted_date);
        existing_dates.push(JSON.parse(JSON.stringify(from_date)));
        from_date.add(1, unit);
      }

      const analysis_promises = existing_dates.map(async (date, index) => {
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

    async findAll(): Promise<Subscription[]> {
      const existing = await subscriptionDbModel
        .find()
        .lean({ virtuals: true });

      if (existing) {
        return map(existing, (subscription) => new Subscription(subscription));
      }

      return null;
    }
    async findAllActivating(): Promise<Subscription[]> {
      const query_conditions = {
        is_active: true,
      };

      const existing = await subscriptionDbModel
        .find(query_conditions)
        .lean({ virtuals: true });

      if (existing) {
        return map(existing, (subscription) => new Subscription(subscription));
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

      const existing = await subscriptionDbModel
        .find(query_conditions)
        .skip(number_of_entries_to_skip)
        .limit(entries_per_page)
        .sort({
          created_at: "desc",
        })
        .lean({ virtuals: true });

      const total_count = await subscriptionDbModel.countDocuments(
        query_conditions
      );

      if (existing) {
        const data = map(
          existing,
          (subscription) => new Subscription(subscription)
        );

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

    async findById({ _id }: { _id: string }): Promise<Subscription> {
      const mongo_id_regex = new RegExp(/^[0-9a-fA-F]{24}$/i);
      const is_mongo_id = mongo_id_regex.test(_id);
      if (!is_mongo_id || !_id) {
        return null;
      }

      const query_conditions = {
        deleted_at: { $in: [null, undefined] },
      };

      _id && (query_conditions["_id"] = _id);

      const existing = await subscriptionDbModel
        .findOne(query_conditions)
        .lean({ virtuals: true });

      if (existing) {
        return new Subscription(existing);
      }
      return null;
    }

    async findByEmail({ email }: { email: string }): Promise<Subscription> {
      const query_conditions = {
        deleted_at: { $in: [null, undefined] },
      };

      email && (query_conditions["email"] = email);

      const existing = await subscriptionDbModel
        .findOne(query_conditions)
        .lean({ virtuals: true });

      if (existing) {
        return new Subscription(existing);
      }
      return null;
    }

    async findOne(): Promise<Subscription> {
      const existing = await subscriptionDbModel
        .findOne()
        .lean({ virtuals: true });

      if (existing) {
        return new Subscription(existing);
      }

      return null;
    }

    async insert(payload: Partial<ISubscription>): Promise<Subscription> {
      const updated_payload = payload;

      const result = await subscriptionDbModel.create([updated_payload]);
      const updated = await subscriptionDbModel
        .findOne({ _id: result[0]?._id })
        .lean({ virtuals: true });

      if (updated) {
        return new Subscription(updated);
      }

      return null;
    }

    async delete({ _id }: { _id: string }): Promise<Subscription> {
      const existing = await subscriptionDbModel.findOneAndUpdate(
        { _id },
        { deleted_at: new Date() }
      );
      const updated = await subscriptionDbModel
        .findOne({ _id })
        .lean({ virtuals: true });

      if (updated) {
        return new Subscription(updated);
      }

      return null;
    }

    async hardDelete({ _id }: { _id: string }): Promise<Subscription> {
      const existing = await subscriptionDbModel.deleteOne({ _id: _id });
      const updated = await subscriptionDbModel
        .findOne({ _id })
        .lean({ virtuals: true });

      if (updated) {
        return new Subscription(updated);
      }

      return null;
    }

    async update(payload: Partial<ISubscription>): Promise<Subscription> {
      const result = await subscriptionDbModel
        .findOneAndUpdate({ _id: payload._id }, payload)
        .lean({ virtuals: true });

      const updated = await subscriptionDbModel
        .findOne({ _id: result?._id })
        .lean({ virtuals: true });

      if (updated) {
        return new Subscription(updated);
      }

      return null;
    }
  })();
}
