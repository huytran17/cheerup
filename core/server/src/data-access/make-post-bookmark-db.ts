import _ from "lodash";
import mongoose from "mongoose";
import IPostBookmarkDb, {
  PaginatedPostBookmarkResult,
} from "./interfaces/post-bookmark-db";
import PostBookmark from "../database/entities/post-bookmark";
import IPostBookmark from "../database/interfaces/post-bookmark";

export default function makePostBookmarkDb({
  postBookmarkDbModel,
  moment,
}: {
  postBookmarkDbModel: mongoose.Model<
    IPostBookmark & mongoose.Document,
    Record<string, unknown>
  >;
  moment: any;
}): IPostBookmarkDb {
  return new (class MongoosePostBookmarkDb implements IPostBookmarkDb {
    /**
     * @description used by post bookmark dashboard
     * FIXME: Currently not in used. To be removed and should never be used.
     * @param param0
     * @returns
     */
    async findAll(): Promise<PostBookmark[] | null> {
      let query_conditions = Object.assign({});

      const existing = await postBookmarkDbModel
        .find(query_conditions)
        .lean({ virtuals: true });

      if (existing) {
        return existing.map((post_bookmark) => new PostBookmark(post_bookmark));
      }

      return null;
    }
    /**
     *
     * @description used by post bookmark API
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
    }): Promise<PaginatedPostBookmarkResult | null> {
      const number_of_entries_to_skip = (page - 1) * entries_per_page;

      const query_conditions = Object.assign({
        deleted_at: { $in: [null, undefined] },
        is_published: true,
      });

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
            "_id title description comments_count thumbnail tags created_at author categories",
          populate: [
            {
              path: "author",
              select: "_id full_name",
            },
            {
              path: "categories",
              select: "_id title",
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
        const data = existing.map(
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

    async findById({ _id }: { _id: string }): Promise<PostBookmark | null> {
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
    }): Promise<PostBookmark | null> {
      const query_conditions = {
        deleted_at: { $in: [null, undefined] },
      };

      if (user_id) {
        query_conditions["user"] = user_id;
      }

      if (post_id) {
        query_conditions["post"] = post_id;
      }

      const existing = await postBookmarkDbModel
        .findOne(query_conditions)
        .lean({ virtuals: true });

      if (existing) {
        return new PostBookmark(existing);
      }
      return null;
    }

    async findOne(): Promise<PostBookmark | null> {
      const existing = await postBookmarkDbModel
        .findOne()
        .lean({ virtuals: true });

      if (existing) {
        return new PostBookmark(existing);
      }

      return null;
    }

    async insert(
      payload: Partial<IPostBookmark>
    ): Promise<PostBookmark | null> {
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

    async delete({ _id }: { _id: string }): Promise<PostBookmark | null> {
      const existing = await postBookmarkDbModel.findOneAndUpdate(
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

    async hardDelete({ _id }: { _id: string }): Promise<PostBookmark | null> {
      const existing = await postBookmarkDbModel.deleteOne({ _id: _id });
      const updated = await postBookmarkDbModel
        .findOne({ _id })
        .lean({ virtuals: true });
      if (updated) {
        return new PostBookmark(updated);
      }
      return null;
    }

    async update(
      payload: Partial<IPostBookmark>
    ): Promise<PostBookmark | null> {
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
