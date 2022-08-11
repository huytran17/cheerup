import _ from "lodash";
import mongoose from "mongoose";
import ISubscribeDb, {
  PaginatedSubscribeResult,
} from "./interfaces/subscribe-db";
import Subscribe from "../database/entities/subscribe";
import ISubscribe from "../database/interfaces/subscribe";

export default function makeSubscribeDb({
  subscribeDbModel,
  moment,
}: {
  subscribeDbModel: mongoose.Model<
    ISubscribe & mongoose.Document,
    Record<string, unknown>
  >;
  moment: any;
}): ISubscribeDb {
  return new (class MongooseSubscribeDb implements ISubscribeDb {
    /**
     * @description used by subscribe dashboard
     * FIXME: Currently not in used. To be removed and should never be used.
     * @param param0
     * @returns
     */
    async findAll(): Promise<Subscribe[] | null> {
      let query_conditions = Object.assign({});

      const existing = await subscribeDbModel
        .find(query_conditions)
        .lean({ virtuals: true });

      if (existing) {
        return existing.map((subscribe) => new Subscribe(subscribe));
      }

      return null;
    }
    /**
     *
     * @description used by subscribe API
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
    }): Promise<PaginatedSubscribeResult | null> {
      const number_of_entries_to_skip = (page - 1) * entries_per_page;

      const query_conditions = Object.assign({});

      if (query) {
        query_conditions["$or"] = [
          {
            email: { $regex: ".*" + query + ".*", $options: "si" },
          },
        ];
      }

      const existing = await subscribeDbModel
        .find(query_conditions)
        .skip(number_of_entries_to_skip)
        .limit(entries_per_page)
        .sort({
          created_at: "desc",
        })
        .lean({ virtuals: true });

      const total_count = await subscribeDbModel.countDocuments(
        query_conditions
      );

      if (existing) {
        const data = existing.map((subscribe) => new Subscribe(subscribe));

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

    async findById({ _id }: { _id: string }): Promise<Subscribe | null> {
      const mongo_id_regex = new RegExp(/^[0-9a-fA-F]{24}$/i);
      const is_mongo_id = mongo_id_regex.test(_id);
      if (!is_mongo_id || !_id) {
        return null;
      }

      const existing = await subscribeDbModel
        .findById(_id)
        .lean({ virtuals: true });

      if (existing) {
        return new Subscribe(existing);
      }
      return null;
    }

    async findByEmail({ email }: { email: string }): Promise<Subscribe | null> {
      const mongo_id_regex = new RegExp(/^[0-9a-fA-F]{24}$/i);
      const is_mongo_id = mongo_id_regex.test(email);
      if (!is_mongo_id || !email) {
        return null;
      }

      const existing = await subscribeDbModel
        .findOne({ email })
        .lean({ virtuals: true });

      if (existing) {
        return new Subscribe(existing);
      }
      return null;
    }

    async findOne(): Promise<Subscribe | null> {
      const existing = await subscribeDbModel
        .findOne()
        .lean({ virtuals: true });

      if (existing) {
        return new Subscribe(existing);
      }

      return null;
    }

    async insert(payload: Partial<ISubscribe>): Promise<Subscribe | null> {
      const updated_payload = payload;

      const result = await subscribeDbModel.create([updated_payload]);
      const updated = await subscribeDbModel
        .findOne({ _id: result[0]?._id })
        .lean({ virtuals: true });

      if (updated) {
        return new Subscribe(updated);
      }
      return null;
    }

    async delete({ _id }: { _id: string }): Promise<Subscribe | null> {
      const existing = await subscribeDbModel.findOneAndUpdate(
        { _id },
        { deleted_at: new Date() }
      );
      const updated = await subscribeDbModel
        .findOne({ _id })
        .lean({ virtuals: true });
      if (updated) {
        return new Subscribe(updated);
      }
      return null;
    }

    async hardDelete({ _id }: { _id: string }): Promise<Subscribe | null> {
      const existing = await subscribeDbModel.deleteOne({ _id: _id });
      const updated = await subscribeDbModel
        .findOne({ _id })
        .lean({ virtuals: true });
      if (updated) {
        return new Subscribe(updated);
      }
      return null;
    }

    async update(payload: Partial<ISubscribe>): Promise<Subscribe | null> {
      const result = await subscribeDbModel
        .findOneAndUpdate({ _id: payload._id }, payload)
        .lean({ virtuals: true });

      const updated = await subscribeDbModel
        .findOne({ _id: result?._id })
        .lean({ virtuals: true });

      if (updated) {
        return new Subscribe(updated);
      }

      return null;
    }
  })();
}
