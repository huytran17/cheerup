import _ from "lodash";
import mongoose from "mongoose";
import IPostDb, {
  PaginatedPostResult,
  IPostAnalyticsData,
} from "./interfaces/post-db";
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
     * get the number of resumes daily for past "distance & unit" (including today)
     * @param param0
     * @returns
     */
    async getPostAnalystics({
      distance = 7,
      unit = "day",
    }: {
      distance?: number;
      unit?: string;
    }): Promise<IPostAnalyticsData> {
      const from_date_formatted = moment().subtract(distance, unit);
      const to_date_formatted = moment();
      const formatted_dates = [];
      const total_created_counts = [];
      const total_deleted_counts = [];
      const total_published_counts = [];
      const total_blocked_comment_counts = [];

      const query_conditions = {};

      const total_count = await postDbModel.countDocuments({
        ...query_conditions,
        created_at: {
          $gte: moment(from_date_formatted, "yyyy-MM-DD").startOf(unit),
          $lte: moment(to_date_formatted, "yyyy-MM-DD").endOf(unit),
        },
      });

      while (from_date_formatted.isSameOrBefore(to_date_formatted, unit)) {
        const date = from_date_formatted.format("YYYY-MM-DD");
        formatted_dates.push(date);

        const [
          total_deleted_count,
          total_created_count,
          total_published_count,
          total_blocked_comment_count,
        ] = await Promise.all([
          postDbModel.countDocuments({
            ...query_conditions,
            deleted_at: {
              $gte: moment(from_date_formatted, "yyyy-MM-DD").startOf(unit),
              $lte: moment(from_date_formatted, "yyyy-MM-DD").endOf(unit),
            },
          }),
          postDbModel.countDocuments({
            ...query_conditions,
            created_at: {
              $gte: moment(from_date_formatted, "yyyy-MM-DD").startOf(unit),
              $lte: moment(from_date_formatted, "yyyy-MM-DD").endOf(unit),
            },
          }),
          postDbModel.countDocuments({
            ...query_conditions,
            is_published: true,
            deleted_at: { $in: [null, undefined] },
            created_at: {
              $gte: moment(from_date_formatted, "yyyy-MM-DD").startOf(unit),
              $lte: moment(from_date_formatted, "yyyy-MM-DD").endOf(unit),
            },
          }),
          postDbModel.countDocuments({
            ...query_conditions,
            is_blocked_comment: true,
            deleted_at: { $in: [null, undefined] },
            created_at: {
              $gte: moment(from_date_formatted, "yyyy-MM-DD").startOf(unit),
              $lte: moment(from_date_formatted, "yyyy-MM-DD").endOf(unit),
            },
          }),
        ]);

        total_created_counts.push(total_created_count);
        total_deleted_counts.push(total_deleted_count);
        total_published_counts.push(total_published_count);
        total_blocked_comment_counts.push(total_blocked_comment_count);
        from_date_formatted.add(1, unit);
      }
      return {
        total_created_counts,
        total_deleted_counts,
        formatted_dates,
        total_count,
        total_blocked_comment_counts,
        total_published_counts,
      };
    }
    /**
     * @description used by post dashboard
     * FIXME: Currently not in used. To be removed and should never be used.
     * @param param0
     * @returns
     */
    async findAll(): Promise<Post[] | null> {
      let query_conditions = Object.assign({});

      const existing = await postDbModel
        .find(query_conditions)
        .populate("author", "-_v")
        .populate("categories", "-_v")
        .sort({
          created_at: "desc",
        })
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

      const query_conditions = Object.assign({});

      if (query) {
        query_conditions["$or"] = [
          {
            title: { $regex: ".*" + query + ".*", $options: "si" },
          },
        ];
      }

      const existing = await postDbModel
        .find(query_conditions)
        .populate("author", "-_v")
        .populate("categories", "-_v")
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

      const existing = await postDbModel
        .findById(_id)
        .populate("author", "-_v")
        .populate("categories", "-_v")
        .lean({ virtuals: true });

      if (existing) {
        return new Post(existing);
      }
      return null;
    }

    async findLatest({ amount }: { amount: number }): Promise<Post[]> {
      const existing = await postDbModel
        .find()
        .limit(amount)
        .populate("author", "-_v")
        .populate("categories", "-_v")
        .sort({
          created_at: "desc",
        })
        .lean({ virtuals: true });

      if (existing) {
        return existing.map((post) => new Post(post));
      }

      return null;
    }

    async findOne(): Promise<Post | null> {
      const existing = await postDbModel
        .findOne()
        .populate("author", "-_v")
        .populate("categories", "-_v")
        .lean({ virtuals: true });

      if (existing) {
        return new Post(existing);
      }

      return null;
    }

    async findHighlight(): Promise<Post | null> {
      const query_conditions = {
        deleted_at: { $in: [null, undefined] },
        is_highlight: true,
      };

      const existing = await postDbModel
        .findOne(query_conditions)
        .select("_id")
        .lean({ virtuals: true });

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
        .populate("author", "-_v")
        .populate("categories", "-_v")
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
