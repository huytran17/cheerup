import { map } from "lodash";
import mongoose from "mongoose";
import IPostBookmarkDb, {
  IPaginatedPostBookmarkResult,
} from "./interfaces/post-bookmark-db";
import PostBookmark from "../database/entities/post-bookmark";
import IPostBookmark from "../database/interfaces/post-bookmark";

export default function makePostBookmarkDb({
  postBookmarkDbModel,
}: {
  postBookmarkDbModel: mongoose.Model<
    IPostBookmark & mongoose.Document,
    Record<string, unknown>
  >;
}): IPostBookmarkDb {
  return new (class MongoosePostBookmarkDb implements IPostBookmarkDb {
    async findAll(): Promise<IPostBookmark[]> {
      const existing = await postBookmarkDbModel
        .find()
        .lean({ virtuals: true });

      if (existing) {
        return map(
          existing,
          (post_bookmark) => new PostBookmark(post_bookmark)
        );
      }

      return null;
    }

    async findAllPaginated({
      query = "",
      page = 1,
      entries_per_page = 15,
      user_id,
    }: {
      query: string;
      page: number;
      entries_per_page?: number;
      user_id?: string;
    }): Promise<IPaginatedPostBookmarkResult> {
      const number_of_entries_to_skip = (page - 1) * entries_per_page;

      const query_conditions = {
        deleted_at: { $in: [null, undefined] },
        is_published: true,
      };

      user_id && (query_conditions["user"] = user_id);

      const existing = await postBookmarkDbModel
        .find(query_conditions)
        .skip(number_of_entries_to_skip)
        .limit(entries_per_page)
        .populate({
          path: "user",
          select: "_id",
        })
        .populate({
          path: "post",
          select:
            "_id title description comments_count thumbnail tags created_at author categories content slug",
          populate: [
            {
              path: "author",
              select: "_id full_name",
            },
            {
              path: "categories",
              select: "_id title badge_color slug",
            },
          ],
        })
        .select("-__v")
        .sort({
          created_at: "desc",
        })
        .lean({ virtuals: true });

      const total_count = await postBookmarkDbModel.countDocuments(
        query_conditions
      );

      if (existing) {
        const data = map(
          existing,
          (post_bookmark) => new PostBookmark(post_bookmark)
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

    async findById({ _id }: { _id: string }): Promise<IPostBookmark> {
      const mongo_id_regex = new RegExp(/^[0-9a-fA-F]{24}$/i);
      const is_mongo_id = mongo_id_regex.test(_id);
      if (!is_mongo_id || !_id) {
        return null;
      }

      const query_conditions = {
        deleted_at: { $in: [null, undefined] },
      };

      _id && (query_conditions["_id"] = _id);

      const existing = await postBookmarkDbModel
        .findOne(query_conditions)
        .lean({ virtuals: true });

      if (existing) {
        return new PostBookmark(existing);
      }
      return null;
    }

    async findByUserAndPost({
      user_id,
      post_id,
    }: {
      user_id: string;
      post_id: string;
    }): Promise<IPostBookmark> {
      const query_conditions = {
        deleted_at: { $in: [null, undefined] },
        user: user_id,
      };

      post_id && (query_conditions["post"] = post_id);

      const existing = await postBookmarkDbModel
        .findOne(query_conditions)
        .lean({ virtuals: true });

      if (existing) {
        return new PostBookmark(existing);
      }
      return null;
    }

    async findOne(): Promise<IPostBookmark> {
      const existing = await postBookmarkDbModel
        .findOne()
        .lean({ virtuals: true });

      if (existing) {
        return new PostBookmark(existing);
      }

      return null;
    }

    async countPostBookmarks({
      user_id,
    }: {
      user_id: string;
    }): Promise<number> {
      const query_conditions = {};

      user_id && (query_conditions["user"] = user_id);

      const count = await postBookmarkDbModel.countDocuments(query_conditions);

      return count;
    }

    async insert(payload: Partial<IPostBookmark>): Promise<IPostBookmark> {
      const updated_payload = payload;

      const result = await postBookmarkDbModel.create([updated_payload]);
      const updated = await postBookmarkDbModel
        .findOne({ _id: result[0]?._id })
        .lean({ virtuals: true });

      if (updated) {
        return new PostBookmark(updated);
      }
      return null;
    }

    async delete({ _id }: { _id: string }): Promise<IPostBookmark> {
      await postBookmarkDbModel.findOneAndUpdate(
        { _id },
        { deleted_at: new Date() }
      );
      const updated = await postBookmarkDbModel
        .findOne({ _id })
        .lean({ virtuals: true });

      if (updated) {
        return new PostBookmark(updated);
      }

      return null;
    }

    async hardDelete({ _id }: { _id: string }): Promise<IPostBookmark> {
      await postBookmarkDbModel.deleteOne({ _id: _id });
      const updated = await postBookmarkDbModel
        .findOne({ _id })
        .lean({ virtuals: true });

      if (updated) {
        return new PostBookmark(updated);
      }

      return null;
    }

    async update(payload: Partial<IPostBookmark>): Promise<IPostBookmark> {
      const result = await postBookmarkDbModel
        .findOneAndUpdate({ _id: payload._id }, payload)
        .lean({ virtuals: true });

      const updated = await postBookmarkDbModel
        .findOne({ _id: result?._id })
        .lean({ virtuals: true });

      if (updated) {
        return new PostBookmark(updated);
      }

      return null;
    }
  })();
}
