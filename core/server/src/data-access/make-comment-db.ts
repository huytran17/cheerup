import { map } from "lodash";
import mongoose from "mongoose";
import Comment from "../database/entities/comment";
import IComment from "../database/interfaces/comment";
import ICommentDb, { IPaginatedCommentResult } from "./interfaces/comment-db";

export default function makeCommentDb({
  commentDbModel,
}: {
  commentDbModel: mongoose.Model<
    IComment & mongoose.Document,
    Record<string, unknown>
  >;
}): ICommentDb {
  return new (class MongooseCommentDb implements ICommentDb {
    async findAll(): Promise<IComment[]> {
      const exists = await commentDbModel
        .find()
        .select("-__v")
        .populate("children", "-_v")
        .populate("user", "_id full_name avatar_url")
        .populate("post", "-_v")
        .lean({ virtuals: true });

      if (exists) {
        return map(exists, (comment) => new Comment(comment));
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
        post: post_id,
        parent: { $in: [null, undefined] },
      };

      const exists = await commentDbModel
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

      if (exists) {
        const data = exists.map((comment) => new Comment(comment));

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

    async findAllByParent({ _id }: { _id: string }): Promise<IComment[]> {
      const query_conditions = {
        parent: _id,
      };

      const exists = await commentDbModel
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

      if (exists) {
        return map(exists, (comment) => new Comment(comment));
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

      const exists = await commentDbModel
        .find(query_conditions)
        .select("-__v")
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

      if (exists) {
        const data = map(exists, (comment) => new Comment(comment));

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

    async findById({
      _id,
      is_only_parent = true,
      is_show_children = false,
    }: {
      _id: string;
      is_only_parent?: boolean;
      is_show_children?: boolean;
    }): Promise<IComment> {
      const query_conditions = {
        _id,
      };

      is_only_parent &&
        (query_conditions["parent"] = { $in: [null, undefined] });

      const exists = is_show_children
        ? await this.findOneByIdWithChildren(query_conditions)
        : await this.findOneById(query_conditions);

      if (exists) {
        return new Comment(exists);
      }
      return null;
    }

    async findOneById(query_conditions: { [key: string]: any }) {
      const exists = await commentDbModel
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

      return exists;
    }

    async findOneByIdWithChildren(query_conditions: { [key: string]: any }) {
      const exists = await commentDbModel
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

      return exists;
    }

    async countByPost({ post_id }: { post_id: string }): Promise<number> {
      const query_conditions = {
        post: post_id,
      };

      const number_of_comments = await commentDbModel.countDocuments(
        query_conditions
      );

      return number_of_comments;
    }

    async findOne(): Promise<IComment> {
      const exists = await commentDbModel
        .findOne()
        .select("-__v")
        .populate("children", "-_v")
        .populate("user", "_id full_name avatar_url")
        .populate("post", "-_v")
        .lean({ virtuals: true });

      if (exists) {
        return new Comment(exists);
      }

      return null;
    }

    async insert(payload: Partial<IComment>): Promise<IComment> {
      const created = await commentDbModel.create(payload);

      if (created) {
        return new Comment(created);
      }

      return null;
    }

    async hardDelete({ _id }: { _id: string }): Promise<IComment> {
      const exists = await commentDbModel.findById({ _id });

      exists && (await exists.deleteOne());

      return null;
    }

    async update(payload: Partial<IComment>): Promise<IComment> {
      const updated = await commentDbModel
        .findOneAndUpdate({ _id: payload._id }, payload, {
          returnDocument: "after",
        })
        .select("-__v")
        .populate("children", "-_v")
        .populate("user", "_id full_name avatar_url")
        .populate("post", "-_v")
        .lean({ virtuals: true });

      if (updated) {
        return new Comment(updated);
      }

      return null;
    }
  })();
}
