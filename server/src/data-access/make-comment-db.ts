import _ from "lodash";
import mongoose from "mongoose";
import ICommentDb, { PaginatedCommentResult } from "./interfaces/comment-db";
import Comment from "../database/entities/comment";
import IComment from "../database/interfaces/comment";

export default function makeCommentDb({
  commentDbModel,
  moment,
}: {
  commentDbModel: mongoose.Model<
    IComment & mongoose.Document,
    Record<string, unknown>
  >;
  moment: any;
}): ICommentDb {
  return new (class MongooseCommentDb implements ICommentDb {
    /**
     *
     * @description used by comment API
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
    }): Promise<PaginatedCommentResult | null> {
      const number_of_entries_to_skip = (page - 1) * entries_per_page;

      const query_conditions = { deleted_at: undefined };

      if (query) {
        Object.defineProperty(query_conditions, "$or", {
          value: [{ email: { $regex: ".*" + query + ".*", $options: "si" } }],
          writable: false,
        });
      }

      const existing = await commentDbModel
        .find(query_conditions)
        .skip(number_of_entries_to_skip)
        .limit(entries_per_page)
        .sort({
          created_at: "desc",
        })
        .lean({ virtuals: true });

      const total_count = await commentDbModel.countDocuments(query_conditions);

      if (existing) {
        const data = existing.map((comment) => new Comment(comment));

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

    async findById({ _id }: { _id: string }): Promise<Comment | null> {
      const mongo_id_regex = new RegExp(/^[0-9a-fA-F]{24}$/i);
      const is_mongo_id = mongo_id_regex.test(_id);
      if (!is_mongo_id || !_id) {
        return null;
      }

      const existing = await commentDbModel
        .findById(_id)
        .lean({ virtuals: true });

      if (existing) {
        return new Comment(existing);
      }
      return null;
    }

    async findOne(): Promise<Comment | null> {
      const existing = await commentDbModel.findOne().lean({ virtuals: true });

      if (existing) {
        return new Comment(existing);
      }

      return null;
    }

    async insert(payload: Partial<IComment>): Promise<Comment | null> {
      const updated_payload = payload;

      const result = await commentDbModel.create([updated_payload]);
      const updated = await commentDbModel
        .findOne({ _id: result[0]?._id })
        .lean({ virtuals: true });

      if (updated) {
        return new Comment(updated);
      }
      return null;
    }

    async delete({ _id }: { _id: string }): Promise<Comment | null> {
      const existing = await commentDbModel.findOneAndUpdate(
        { _id },
        { deleted_at: new Date() }
      );
      const updated = await commentDbModel
        .findOne({ _id })
        .lean({ virtuals: true });
      if (updated) {
        return new Comment(updated);
      }
      return null;
    }

    async hardDelete({ _id }: { _id: string }): Promise<Comment | null> {
      const existing = await commentDbModel.deleteOne({ _id: _id });
      const updated = await commentDbModel
        .findOne({ _id })
        .lean({ virtuals: true });
      if (updated) {
        return new Comment(updated);
      }
      return null;
    }

    async update(payload: Partial<IComment>): Promise<Comment | null> {
      const result = await commentDbModel
        .findOneAndUpdate({ _id: payload._id }, payload)
        .lean({ virtuals: true });

      const updated = await commentDbModel
        .findOne({ _id: result?._id })
        .lean({ virtuals: true });

      if (updated) {
        return new Comment(updated);
      }

      return null;
    }
  })();
}
