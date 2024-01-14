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
      const exists = await postBookmarkDbModel
        .find()
        .select("-__v")
        .lean({ virtuals: true });

      if (exists) {
        return map(exists, (post_bookmark) => new PostBookmark(post_bookmark));
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
        user: user_id,
        deleted_at: { $in: [null, undefined] },
      };

      const exists = await postBookmarkDbModel
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

      if (exists) {
        const data = map(
          exists,
          (post_bookmark) => new PostBookmark(post_bookmark)
        );

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

    async findById({ _id }: { _id: string }): Promise<IPostBookmark> {
      const query_conditions = {
        _id,
        deleted_at: { $in: [null, undefined] },
      };

      const exists = await postBookmarkDbModel
        .findOne(query_conditions)
        .select("-__V")
        .lean({ virtuals: true });

      if (exists) {
        return new PostBookmark(exists);
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
        post: post_id,
      };

      const exists = await postBookmarkDbModel
        .findOne(query_conditions)
        .select("-__v")
        .lean({ virtuals: true });

      if (exists) {
        return new PostBookmark(exists);
      }

      return null;
    }

    async findOne(): Promise<IPostBookmark> {
      const exists = await postBookmarkDbModel
        .findOne()
        .select("-__v")
        .lean({ virtuals: true });

      if (exists) {
        return new PostBookmark(exists);
      }

      return null;
    }

    async countPostBookmarks({
      user_id,
    }: {
      user_id: string;
    }): Promise<number> {
      const query_conditions = {
        user: user_id,
      };

      const count = await postBookmarkDbModel.countDocuments(query_conditions);

      return count;
    }

    async insert(payload: Partial<IPostBookmark>): Promise<IPostBookmark> {
      const created = await postBookmarkDbModel.create(payload);

      if (created) {
        return new PostBookmark(created);
      }

      return null;
    }

    async delete({ _id }: { _id: string }): Promise<IPostBookmark> {
      const deleted = await postBookmarkDbModel
        .findOneAndUpdate({ _id }, { deleted_at: new Date() })
        .select("-__v")
        .lean({ virtuals: true });

      if (deleted) {
        return new PostBookmark(deleted);
      }

      return null;
    }

    async hardDelete({ _id }: { _id: string }): Promise<IPostBookmark> {
      const deleted = await postBookmarkDbModel
        .findByIdAndDelete({ _id })
        .select("-__v")
        .lean({ virtuals: true });

      if (deleted) {
        return new PostBookmark(deleted);
      }

      return null;
    }

    async update(payload: Partial<IPostBookmark>): Promise<IPostBookmark> {
      const updated = await postBookmarkDbModel
        .findOneAndUpdate({ _id: payload._id }, payload)
        .select("-__v")
        .lean({ virtuals: true });

      if (updated) {
        return new PostBookmark(updated);
      }

      return null;
    }
  })();
}
