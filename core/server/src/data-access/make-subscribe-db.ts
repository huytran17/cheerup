import _ from "lodash";
import mongoose from "mongoose";
import ISubscriptionDb, {
  PaginatedSubscriptionResult,
} from "./interfaces/subscription-db";
import Subscription from "../database/entities/subscription";
import ISubscription from "../database/interfaces/subscription";

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
    /**
     * @description used by subscription dashboard
     * FIXME: Currently not in used. To be removed and should never be used.
     * @param param0
     * @returns
     */
    async findAll(): Promise<Subscription[] | null> {
      let query_conditions = Object.assign({});

      const existing = await subscriptionDbModel
        .find(query_conditions)
        .lean({ virtuals: true });

      if (existing) {
        return existing.map((subscription) => new Subscription(subscription));
      }

      return null;
    }
    /**
     *
     * @description used by subscription API
     * @param param0
     * @param param1
     */
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
        const data = existing.map((subscription) => new Subscription(subscription));

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

      const existing = await subscriptionDbModel
        .findById(_id)
        .lean({ virtuals: true });

      if (existing) {
        return new Subscription(existing);
      }
      return null;
    }

    async findByEmail({ email }: { email: string }): Promise<Subscription | null> {
      const mongo_id_regex = new RegExp(/^[0-9a-fA-F]{24}$/i);
      const is_mongo_id = mongo_id_regex.test(email);
      if (!is_mongo_id || !email) {
        return null;
      }

      const existing = await subscriptionDbModel
        .findOne({ email })
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

    async insert(payload: Partial<ISubscription>): Promise<Subscription | null> {
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

    async update(payload: Partial<ISubscription>): Promise<Subscription | null> {
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
