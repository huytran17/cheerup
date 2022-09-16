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
    async findAll(): Promise<Comment[] | null> {
      let query_conditions = Object.assign({
        deleted_at: { $in: [null, undefined] },
        parent: { $in: [null, undefined] },
      });

      const existing = await commentDbModel
        .find(query_conditions)
        .populate("children", "-_v")
        .populate("user", "-_v")
        .populate("post", "-_v")
        .lean({ virtuals: true });
      if (existing) {
        return existing.map((comment) => new Comment(comment));
      }

      return null;
    }

    async findAllByPost({
      post_id,
    }: {
      post_id: string;
    }): Promise<Comment[] | null> {
      let query_conditions = Object.assign({
        deleted_at: { $in: [null, undefined] },
        parent: { $in: [null, undefined] },
      });

      if (post_id) {
        query_conditions["post"] = post_id;
      }

      const existing = await commentDbModel
        .find(query_conditions)
        .select(
          "_id children content user meta likes_count dislikes_count post created_at updated_at"
        )
        .populate({
          path: "children",
          select: "_id content user meta parent post",
          populate: [
            {
              path: "user",
              select: "_id full_name avatar_url",
            },
            {
              path: "parent",
              select: "_id",
            },
          ],
        })
        .populate({
          path: "user",
          select: "_id full_name avatar_url",
        })
        .sort({
          created_at: "desc",
        })
        .lean({ virtuals: true });

      if (existing) {
        return existing.map((comment) => new Comment(comment));
      }

      return null;
    }

    async findAllByParent({
      parent_id,
    }: {
      parent_id: string;
    }): Promise<Comment[] | null> {
      let query_conditions = Object.assign({
        parent: parent_id,
      });

      const existing = await commentDbModel
        .find(query_conditions)
        .lean({ virtuals: true });
      if (existing) {
        return existing.map((comment) => new Comment(comment));
      }

      return null;
    }
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

      const query_conditions = Object.assign({
        deleted_at: { $in: [null, undefined] },
        parent: { $in: [null, undefined] },
      });

      if (query) {
        query_conditions["$or"] = [
          {
            email: { $regex: ".*" + query + ".*", $options: "si" },
          },
        ];
      }

      const existing = await commentDbModel
        .find(query_conditions)
        .populate("children", "-_v")
        .populate("user", "-_v")
        .populate("post", "-_v")
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

    async findById({
      _id,
      is_only_parent,
    }: {
      _id: string;
      is_only_parent?: boolean;
    }): Promise<Comment | null> {
      const mongo_id_regex = new RegExp(/^[0-9a-fA-F]{24}$/i);
      const is_mongo_id = mongo_id_regex.test(_id);
      if (!is_mongo_id || !_id) {
        return null;
      }

      let query_conditions = {
        deleted_at: { $in: [null, undefined] },
      };

      if (is_only_parent) {
        query_conditions["parent"] = { $in: [null, undefined] };
      }

      if (_id) {
        query_conditions["_id"] = _id;
      }

      const existing = await commentDbModel
        .findOne(query_conditions)
        .populate({
          path: "children",
          select: "-_v",
          populate: {
            path: "parent",
            select: "_id",
          },
        })
        .populate("user", "-_v")
        .populate("post", "-_v")
        .lean({ virtuals: true });

      if (existing) {
        return new Comment(existing);
      }
      return null;
    }

    async countByPost({
      post_id,
    }: {
      post_id: string;
    }): Promise<number | null> {
      const mongo_id_regex = new RegExp(/^[0-9a-fA-F]{24}$/i);
      const is_mongo_id = mongo_id_regex.test(post_id);
      if (!is_mongo_id || !post_id) {
        return null;
      }

      const query_conditions = {
        post: post_id,
      };

      const number_of_comments = await commentDbModel.countDocuments(
        query_conditions
      );

      return number_of_comments;
    }

    async findOne(): Promise<Comment | null> {
      const existing = await commentDbModel
        .findOne()
        .populate("children", "-_v")
        .populate("user", "-_v")
        .populate("post", "-_v")
        .lean({ virtuals: true });

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
        .populate("children", "-_v")
        .populate("user", "-_v")
        .populate("post", "-_v")
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
