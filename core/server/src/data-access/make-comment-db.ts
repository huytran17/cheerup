import { map } from "lodash";
import mongoose from "mongoose";
import ICommentDb, { IPaginatedCommentResult } from "./interfaces/comment-db";
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
    async findAll(): Promise<Comment[]> {
      const query_conditions = {
        parent: { $in: [null, undefined] },
      };

      const existing = await commentDbModel
        .find(query_conditions)
        .populate("children", "-_v")
        .populate("user", "_id full_name avatar_url")
        .populate("post", "-_v")
        .lean({ virtuals: true });
      if (existing) {
        return map(existing, (comment) => new Comment(comment));
      }

      return null;
    }

    async findAllByPostPaginated(
      {
        post_id,
      }: {
        post_id: string;
      },
      {
        query,
        page,
        entries_per_page,
      }: {
        query: string;
        page: number;
        entries_per_page: number;
      }
    ): Promise<IPaginatedCommentResult> {
      const number_of_entries_to_skip = (page - 1) * entries_per_page;

      const query_conditions = {
        parent: { $in: [null, undefined] },
      };

      post_id && (query_conditions["post"] = post_id);

      const existing = await commentDbModel
        .find(query_conditions)
        .select("_id children parent content user post created_at updated_at")
        .populate({
          path: "user",
          select: "_id full_name avatar_url avatar",
        })
        .populate({
          path: "parent",
          select: "_id",
        })
        .limit(entries_per_page)
        .skip(number_of_entries_to_skip)
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

    async findAllByParent({
      parent_id,
    }: {
      parent_id: string;
    }): Promise<Comment[]> {
      const query_conditions = {
        parent: parent_id,
      };

      const existing = await commentDbModel
        .find(query_conditions)
        .select("_id parent content user post created_at updated_at")
        .populate({
          path: "user",
          select: "_id full_name avatar_url avatar",
        })
        .populate({
          path: "parent",
          select: "_id",
        })
        .lean({ virtuals: true });

      if (existing) {
        return map(existing, (comment) => new Comment(comment));
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
    }): Promise<IPaginatedCommentResult> {
      const number_of_entries_to_skip = (page - 1) * entries_per_page;

      const query_conditions = {
        parent: { $in: [null, undefined] },
      };

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
        .populate("user", "_id full_name avatar_url avatar")
        .populate("post", "-_v")
        .skip(number_of_entries_to_skip)
        .limit(entries_per_page)
        .sort({
          created_at: "desc",
        })
        .lean({ virtuals: true });

      const total_count = await commentDbModel.countDocuments(query_conditions);

      if (existing) {
        const data = map(existing, (comment) => new Comment(comment));

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
      is_only_parent = true,
      is_show_children = false,
    }: {
      _id: string;
      is_only_parent?: boolean;
      is_show_children?: boolean;
    }): Promise<Comment> {
      const mongo_id_regex = new RegExp(/^[0-9a-fA-F]{24}$/i);
      const is_mongo_id = mongo_id_regex.test(_id);
      if (!is_mongo_id || !_id) {
        return null;
      }

      const query_conditions = {
        _id,
      };

      is_only_parent &&
        (query_conditions["parent"] = { $in: [null, undefined] });

      const existing = is_show_children
        ? await this.findOneByIdWithChildren(query_conditions)
        : await this.findOneById(query_conditions);

      if (existing) {
        return new Comment(existing);
      }
      return null;
    }

    async findOneById(query_conditions) {
      const existing = await commentDbModel
        .findOne(query_conditions)
        .select("_id children parent content user post created_at updated_at")
        .populate({
          path: "user",
          select: "_id full_name avatar_url avatar",
        })
        .populate({
          path: "parent",
          select: "_id",
        })
        .lean({ virtuals: true });

      return existing;
    }

    async findOneByIdWithChildren(query_conditions) {
      const existing = await commentDbModel
        .findOne(query_conditions)
        .select("_id children parent content user post created_at updated_at")
        .populate({
          path: "children",
          select: "_id content user parent post created_at updated_at",
          populate: [
            {
              path: "user",
              select: "_id full_name avatar_url avatar",
            },
            {
              path: "parent",
              select: "_id",
            },
          ],
        })
        .populate({
          path: "user",
          select: "_id full_name avatar_url avatar",
        })
        .populate({
          path: "parent",
          select: "_id",
        })
        .lean({ virtuals: true });

      return existing;
    }

    async countByPost({ post_id }: { post_id: string }): Promise<number> {
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

    async findOne(): Promise<Comment> {
      const existing = await commentDbModel
        .findOne()
        .populate("children", "-_v")
        .populate("user", "_id full_name avatar_url")
        .populate("post", "-_v")
        .lean({ virtuals: true });

      if (existing) {
        return new Comment(existing);
      }

      return null;
    }

    async insert(payload: Partial<IComment>): Promise<Comment> {
      const updated_payload = payload;

      const result = await commentDbModel.create([updated_payload]);
      const updated = await commentDbModel
        .findOne({ _id: result[0]?._id })
        .populate({
          path: "user",
          select: "_id avatar full_name",
        })
        .lean({ virtuals: true });

      if (updated) {
        return new Comment(updated);
      }

      return null;
    }

    async hardDelete({ _id }: { _id: string }): Promise<Comment> {
      const existing = await commentDbModel.findOne({ _id });
      await existing?.deleteOne();

      const updated = await commentDbModel
        .findOne({ _id })
        .lean({ virtuals: true });

      if (updated) {
        return new Comment(updated);
      }

      return null;
    }

    async update(payload: Partial<IComment>): Promise<Comment> {
      const result = await commentDbModel
        .findOneAndUpdate({ _id: payload._id }, payload)
        .populate("children", "-_v")
        .populate("user", "_id full_name avatar_url")
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
