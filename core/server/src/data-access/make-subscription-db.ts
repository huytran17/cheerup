import _ from "lodash";
import mongoose from "mongoose";
import Subscription from "../database/entities/subscription";
import ISubscription from "../database/interfaces/subscription";
import ISubscriptionDb, {
  ISubscriptionAnalyticsData,
  PaginatedSubscriptionResult,
} from "./interfaces/subscription-db";

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
      distance = 7,
      unit = "day",
    }: {
      distance?: number;
      unit?: string;
    }): Promise<ISubscriptionAnalyticsData> {
      const from_date_formatted = moment().subtract(distance, unit);
      const to_date_formatted = moment();
      const formatted_dates = [];
      const total_created_counts = [];
      const total_active_counts = [];

      const query_conditions = {};

      const total_count = await subscriptionDbModel.countDocuments({
        ...query_conditions,
        created_at: {
          $gte: moment(from_date_formatted, "yyyy-MM-DD").startOf(unit),
          $lte: moment(to_date_formatted, "yyyy-MM-DD").endOf(unit),
        },
      });

      while (from_date_formatted.isSameOrBefore(to_date_formatted, unit)) {
        const date = from_date_formatted.format("YYYY-MM-DD");
        formatted_dates.push(date);

        const [total_active_count, total_created_count] = await Promise.all([
          subscriptionDbModel.countDocuments({
            ...query_conditions,
            deleted_at: { $in: [null, undefined] },
            is_active: true,
          }),
          subscriptionDbModel.countDocuments({
            ...query_conditions,
            created_at: {
              $gte: moment(from_date_formatted, "yyyy-MM-DD").startOf(unit),
              $lte: moment(from_date_formatted, "yyyy-MM-DD").endOf(unit),
            },
          }),
        ]);

        total_created_counts.push(total_created_count);
        total_active_counts.push(total_active_count);
        from_date_formatted.add(1, unit);
      }
      return {
        total_created_counts,
        total_active_counts,
        formatted_dates,
        total_count,
      };
    }

    async findAll(): Promise<Subscription[] | null> {
      const existing = await subscriptionDbModel
        .find()
        .lean({ virtuals: true });

      if (existing) {
        return existing.map((subscription) => new Subscription(subscription));
      }

      return null;
    }
    async findAllActivating(): Promise<Subscription[] | null> {
      const query_conditions = {
        is_active: true,
      };

      const existing = await subscriptionDbModel
        .find(query_conditions)
        .lean({ virtuals: true });

      if (existing) {
        return existing.map((subscription) => new Subscription(subscription));
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
    }): Promise<PaginatedSubscriptionResult | null> {
      const number_of_entries_to_skip = (page - 1) * entries_per_page;

      const query_conditions = Object.assign({});

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
        const data = existing.map(
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

    async findById({ _id }: { _id: string }): Promise<Subscription | null> {
      const mongo_id_regex = new RegExp(/^[0-9a-fA-F]{24}$/i);
      const is_mongo_id = mongo_id_regex.test(_id);
      if (!is_mongo_id || !_id) {
        return null;
      }

      const query_conditions = {
        deleted_at: { $in: [null, undefined] },
      };

      if (_id) {
        query_conditions["_id"] = _id;
      }

      const existing = await subscriptionDbModel
        .findOne(query_conditions)
        .lean({ virtuals: true });

      if (existing) {
        return new Subscription(existing);
      }
      return null;
    }

    async findByEmail({
      email,
    }: {
      email: string;
    }): Promise<Subscription | null> {
      const query_conditions = {
        deleted_at: { $in: [null, undefined] },
      };

      if (email) {
        query_conditions["email"] = email;
      }

      const existing = await subscriptionDbModel
        .findOne(query_conditions)
        .lean({ virtuals: true });

      if (existing) {
        return new Subscription(existing);
      }
      return null;
    }

    async findOne(): Promise<Subscription | null> {
      const existing = await subscriptionDbModel
        .findOne()
        .lean({ virtuals: true });

      if (existing) {
        return new Subscription(existing);
      }

      return null;
    }

    async insert(
      payload: Partial<ISubscription>
    ): Promise<Subscription | null> {
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

    async delete({ _id }: { _id: string }): Promise<Subscription | null> {
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

    async hardDelete({ _id }: { _id: string }): Promise<Subscription | null> {
      const existing = await subscriptionDbModel.deleteOne({ _id: _id });
      const updated = await subscriptionDbModel
        .findOne({ _id })
        .lean({ virtuals: true });
      if (updated) {
        return new Subscription(updated);
      }
      return null;
    }

    async update(
      payload: Partial<ISubscription>
    ): Promise<Subscription | null> {
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
