import { isEmpty, map, sortBy } from "lodash";
import mongoose, { SortOrder } from "mongoose";
import { AnalyssisUnit } from "../constants/analysis-unit";
import Post from "../database/entities/post";
import IPost from "../database/interfaces/post";
import IPostDb, {
  IMostPopularPostsAnalytics,
  IPaginatedPostResult,
  IPostAnalytics,
} from "./interfaces/post-db";

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
    async getMostPopularPostsAnalystics({
      range = [],
      unit = "day",
      limit = 4,
    }: {
      range?: string[];
      unit?: string;
      limit?: number;
    }): Promise<IMostPopularPostsAnalytics> {
      const FROM_INDEX = 0;
      const END_INDEX = 1;
      const ROOT_LIMIT = 10;

      const from_date = range[FROM_INDEX]
        ? moment(range[FROM_INDEX])
        : moment().subtract(1, AnalyssisUnit.YEAR);

      const to_date = moment(range[END_INDEX])
        ? moment(range[END_INDEX])
        : moment();

      const start_date_formatted = new Date(
        moment(from_date, "yyyy-MM-DD").startOf(unit)
      );
      const end_date_formatted = new Date(
        moment(to_date, "yyyy-MM-DD").endOf(unit)
      );

      const query_conditions = {
        created_at: {
          $gte: start_date_formatted,
          $lte: end_date_formatted,
        },
      };

      const results = await postDbModel
        .find(query_conditions)
        .select("_id categories author title views created_at deleted_at")
        .populate({
          path: "categories",
          select: "_id title",
        })
        .populate({
          path: "author",
          select: "_id full_name",
        })
        .sort({ views: -1 })
        .limit(ROOT_LIMIT)
        .lean({ virtual: true });

      if (isEmpty(results)) {
        return null;
      }

      const data = map(results, (post) => new Post(post));

      const limited_results = data.slice(0, limit);
      const post_views = data.map((post) => post.views);
      const post_titles = data.map((post) => post.title);

      return {
        posts: limited_results,
        post_views,
        post_titles,
      };
    }

    async getPostAnalystics({
      range = [],
      unit = "day",
    }: {
      range?: string[];
      unit?: string;
    }): Promise<IPostAnalytics> {
      const FROM_INDEX = 0;
      const END_INDEX = 1;

      const from_date = range[FROM_INDEX]
        ? moment(range[FROM_INDEX])
        : moment().subtract(1, AnalyssisUnit.YEAR);

      const to_date = moment(range[END_INDEX])
        ? moment(range[END_INDEX])
        : moment();

      const formatted_dates = [];
      const existing_dates = [];
      const total_created_counts = [];
      const total_deleted_counts = [];
      const total_blocked_comment_counts = [];

      const total_count = await postDbModel.countDocuments({
        created_at: {
          $gte: moment(from_date, "yyyy-MM-DD").startOf(unit),
          $lte: moment(to_date, "yyyy-MM-DD").endOf(unit),
        },
      });

      while (from_date.isSameOrBefore(to_date, unit)) {
        let formatted_date = from_date.format("YYYY-MM-DD");

        const format_date_types = {
          [AnalyssisUnit.MONTH]: from_date.format("YYYY-MM"),
          [AnalyssisUnit.YEAR]: from_date.format("YYYY"),
        };

        if (format_date_types[unit]) {
          formatted_date = format_date_types[unit];
        }

        formatted_dates.push(formatted_date);
        existing_dates.push(JSON.parse(JSON.stringify(from_date)));
        from_date.add(1, unit);
      }

      const analysis_promises = existing_dates.map(async (date, index) => {
        const start_of = new Date(moment(date, "yyyy-MM-DD").startOf(unit));
        const end_of = new Date(moment(date, "yyyy-MM-DD").endOf(unit));

        const result = await postDbModel.aggregate([
          {
            $facet: {
              total_created: [
                {
                  $match: {
                    created_at: { $gte: start_of, $lte: end_of },
                  },
                },
                {
                  $count: "total_created_count",
                },
              ],
              total_deleted: [
                {
                  $match: {
                    created_at: { $gte: start_of, $lte: end_of },
                    deleted_at: { $nin: [null, undefined] },
                  },
                },
                {
                  $count: "total_deleted_count",
                },
              ],
              total_blocked_comment: [
                {
                  $match: {
                    $and: [
                      {
                        created_at: { $gte: start_of, $lte: end_of },
                      },
                      { deleted_at: { $in: [null, undefined] } },
                      { is_blocked_comment: true },
                    ],
                  },
                },
                {
                  $count: "total_blocked_comment_count",
                },
              ],
            },
          },
        ]);

        result.push({ order: index });

        return result;
      });

      const results = await Promise.all(analysis_promises);
      const sorted_results = sortBy(results, ["order"]);

      for (const result of sorted_results) {
        const total_created_count =
          result[0]?.total_created[0]?.total_created_count || 0;
        total_created_counts.push(total_created_count);

        const total_deleted_count =
          result[0]?.total_deleted[0]?.total_deleted_count || 0;
        total_deleted_counts.push(total_deleted_count);

        const total_blocked_comment_count =
          result[0]?.total_blocked_comment[0]?.total_blocked_comment_count || 0;
        total_blocked_comment_counts.push(total_blocked_comment_count);
      }

      return {
        total_created_counts,
        total_deleted_counts,
        formatted_dates,
        total_count,
        total_blocked_comment_counts,
      };
    }

    async findAll(): Promise<IPost[]> {
      const existing = await postDbModel
        .find()
        .select("-__v")
        .populate("author", "_id full_name")
        .populate("categories", "-_v")
        .sort({
          created_at: "desc",
        })
        .lean({ virtuals: true });

      if (existing) {
        return map(existing, (post) => new Post(post));
      }

      return null;
    }

    async findAllForSEO(): Promise<IPost[]> {
      const query_conditions = {
        deleted_at: { $in: [null, undefined] },
      };

      const existing = await postDbModel
        .find(query_conditions)
        .select("_id seo slug")
        .sort({
          created_at: "desc",
        })
        .lean({ virtuals: true });

      if (existing) {
        return map(existing, (post) => new Post(post));
      }

      return null;
    }

    async findAllPaginated(
      {
        categories,
        tags,
        sorts,
      }: {
        categories?: string[];
        tags?: string[];
        sorts?: string;
      },
      {
        query = "",
        page = 1,
        entries_per_page = 15,
      }: {
        query: string;
        page: number;
        entries_per_page?: number;
      }
    ): Promise<IPaginatedPostResult> {
      const number_of_entries_to_skip = (page - 1) * entries_per_page;

      const query_conditions = {
        deleted_at: { $in: [null, undefined] },
      };

      const has_categories = !isEmpty(categories);
      has_categories && (query_conditions["categories"] = { $in: categories });

      const has_tags = !isEmpty(tags);
      has_tags && (query_conditions["tags"] = { $in: tags });

      if (query) {
        query_conditions["$or"] = [
          { title: { $regex: ".*" + query + ".*", $options: "si" } },
          { description: { $regex: ".*" + query + ".*", $options: "si" } },
        ];
      }

      const sort_params: {
        [key: string]: SortOrder;
      } = (!isEmpty(sorts) && { ...JSON.parse(sorts) }) || {
        created_at: "desc",
      };

      const existing = await postDbModel
        .find(query_conditions)
        .select("-__v")
        .populate("author", "_id full_name")
        .populate("categories", "-_v")
        .skip(number_of_entries_to_skip)
        .limit(entries_per_page)
        .sort(sort_params)
        .lean({ virtuals: true });

      const total_count = await postDbModel.countDocuments(query_conditions);

      if (existing) {
        const data = map(existing, (post) => new Post(post));

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

    async findById({ _id }: { _id: string }): Promise<IPost> {
      const query_conditions = {
        _id,
        deleted_at: { $in: [null, undefined] },
      };

      const existing = await postDbModel
        .findOne(query_conditions)
        .select("-__v")
        .populate("author", "_id full_name")
        .populate("categories", "-_v")
        .lean({ virtuals: true });

      if (existing) {
        return new Post(existing);
      }

      return null;
    }

    async increaseViews({ _id }: { _id: string }): Promise<IPost> {
      const query_conditions = {
        _id,
        deleted_at: { $in: [null, undefined] },
      };

      const existing = await postDbModel
        .findOneAndUpdate(query_conditions, { $inc: { views: 1 } })
        .select("_id")
        .lean({ virtuals: true });

      if (existing) {
        return new Post(existing);
      }

      return null;
    }

    async findSoftDeletedById({ _id }: { _id: string }): Promise<IPost> {
      const query_conditions = {
        _id,
      };

      const existing = await postDbModel
        .findOne(query_conditions)
        .select("-__v")
        .populate("author", "_id full_name")
        .populate("categories", "-_v")
        .lean({ virtuals: true });

      if (existing) {
        return new Post(existing);
      }

      return null;
    }

    async findBySlug({ slug }: { slug: string }): Promise<IPost> {
      const query_conditions = {
        slug,
        deleted_at: { $in: [null, undefined] },
      };

      const existing = await postDbModel
        .findOne(query_conditions)
        .select("-__v")
        .populate("author", "_id full_name")
        .populate("categories", "-_v")
        .lean({ virtuals: true });

      if (existing) {
        return new Post(existing);
      }

      return null;
    }

    async countByCategory({
      category_id,
    }: {
      category_id: string;
    }): Promise<number> {
      const query_conditions = {
        deleted_at: { $in: [null, undefined] },
        categories: category_id,
      };

      const count = await postDbModel.countDocuments(query_conditions);

      return count;
    }

    async findSuggestionPosts({
      amount = 5,
      categories,
      exclude_ids,
    }: {
      amount: number;
      categories: string[];
      exclude_ids?: string[];
    }): Promise<IPost[]> {
      const query_conditions = {
        deleted_at: { $in: [null, undefined] },
      };

      !isEmpty(categories) &&
        (query_conditions["categories"] = { $in: categories });

      !isEmpty(exclude_ids) &&
        (query_conditions["_id"] = { $nin: exclude_ids });

      const existing = await postDbModel
        .find(query_conditions)
        .select("-__v")
        .limit(amount)
        .populate("author", "_id full_name")
        .populate("categories", "-_v")
        .sort({
          created_at: "desc",
        })
        .lean({ virtuals: true });

      if (existing) {
        return map(existing, (post) => new Post(post));
      }

      return null;
    }

    async findOne(): Promise<IPost> {
      const query_conditions = {
        deleted_at: { $in: [null, undefined] },
      };

      const existing = await postDbModel
        .findOne(query_conditions)
        .select("-__v")
        .populate("author", "_id full_name")
        .populate("categories", "-_v")
        .lean({ virtuals: true });

      if (existing) {
        return new Post(existing);
      }

      return null;
    }

    async insert(payload: Partial<IPost>): Promise<IPost> {
      const created = await postDbModel.create(payload);

      if (created) {
        return new Post(created);
      }

      return null;
    }

    async delete({ _id }: { _id: string }): Promise<IPost> {
      const deleted = await postDbModel
        .findOneAndUpdate(
          { _id },
          { deleted_at: new Date() },
          { returnDocument: "after" }
        )
        .select("-__v")
        .lean({ virtuals: true });

      if (deleted) {
        return new Post(deleted);
      }

      return null;
    }

    async hardDelete({ _id }: { _id: string }): Promise<IPost> {
      const exists = await postDbModel.findById({ _id });

      exists && (await exists.deleteOne());

      return null;
    }

    async update(payload: Partial<IPost>): Promise<IPost> {
      const updated = await postDbModel
        .findOneAndUpdate({ _id: payload._id }, payload, {
          returnDocument: "after",
        })
        .select("-__v")
        .populate("author", "full_name")
        .populate("categories", "title")
        .lean({ virtuals: true });

      if (updated) {
        return new Post(updated);
      }

      return null;
    }

    async insertMany(payload: Partial<Post[]>): Promise<IPost[]> {
      const posts = await postDbModel.insertMany(payload);

      if (posts) {
        return posts.map((post) => new Post(post));
      }

      return null;
    }
  })();
}
