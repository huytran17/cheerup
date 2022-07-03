import _ from "lodash";
import mongoose from "mongoose";
import IPostDb, { PaginatedPostResult } from "./interfaces/post-db";
import Post from "../database/entities/post";
import IPost from "../database/interfaces/post";

export default function makePostDb({
  postDbModel,
  moment,
}: {
  postDbModel: mongoose.Model<
    IPost & mongoose.Document,
    Record<string, unknown>
  >;
  moment: any;
}): IPostDb {
  return new (class MongoosePostDb implements IPostDb {
    /**
     * @description used by post dashboard
     * FIXME: Currently not in used. To be removed and should never be used.
     * @param param0
     * @returns
     */
    async findAll(): Promise<Post[] | null> {
      let query_conditions = { deleted_at: null };

      const existing = await postDbModel
        .find(query_conditions)
        .lean({ virtuals: true });

      if (existing) {
        return existing.map((post) => new Post(post));
      }

      return null;
    }
    /**
     *
     * @description used by post API
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
    }): Promise<PaginatedPostResult | null> {
      const number_of_entries_to_skip = (page - 1) * entries_per_page;

      const query_conditions = { deleted_at: undefined };

      if (query) {
        Object.defineProperty(query_conditions, "$or", {
          value: [{ email: { $regex: ".*" + query + ".*", $options: "si" } }],
          writable: false,
        });
      }

      const existing = await postDbModel
        .find(query_conditions)
        .skip(number_of_entries_to_skip)
        .limit(entries_per_page)
        .sort({
          created_at: "desc",
        })
        .lean({ virtuals: true });

      const total_count = await postDbModel.countDocuments(query_conditions);

      if (existing) {
        const data = existing.map((post) => new Post(post));

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

    async findById({ _id }: { _id: string }): Promise<Post | null> {
      const mongo_id_regex = new RegExp(/^[0-9a-fA-F]{24}$/i);
      const is_mongo_id = mongo_id_regex.test(_id);
      if (!is_mongo_id || !_id) {
        return null;
      }

      const existing = await postDbModel.findById(_id).lean({ virtuals: true });

      if (existing) {
        return new Post(existing);
      }
      return null;
    }

    async findOne(): Promise<Post | null> {
      const existing = await postDbModel.findOne().lean({ virtuals: true });

      if (existing) {
        return new Post(existing);
      }

      return null;
    }

    async insert(payload: Partial<IPost>): Promise<Post | null> {
      const updated_payload = payload;

      const result = await postDbModel.create([updated_payload]);
      const updated = await postDbModel
        .findOne({ _id: result[0]?._id })
        .lean({ virtuals: true });

      if (updated) {
        return new Post(updated);
      }
      return null;
    }

    async delete({ _id }: { _id: string }): Promise<Post | null> {
      const existing = await postDbModel.findOneAndUpdate(
        { _id },
        { deleted_at: new Date() }
      );
      const updated = await postDbModel
        .findOne({ _id })
        .lean({ virtuals: true });
      if (updated) {
        return new Post(updated);
      }
      return null;
    }

    async hardDelete({ _id }: { _id: string }): Promise<Post | null> {
      const existing = await postDbModel.deleteOne({ _id: _id });
      const updated = await postDbModel
        .findOne({ _id })
        .lean({ virtuals: true });
      if (updated) {
        return new Post(updated);
      }
      return null;
    }

    async update(payload: Partial<IPost>): Promise<Post | null> {
      const result = await postDbModel
        .findOneAndUpdate({ _id: payload._id }, payload)
        .lean({ virtuals: true });

      const updated = await postDbModel
        .findOne({ _id: result?._id })
        .lean({ virtuals: true });

      if (updated) {
        return new Post(updated);
      }

      return null;
    }
  })();
}
