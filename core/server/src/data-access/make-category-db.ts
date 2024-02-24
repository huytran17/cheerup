import { orderBy, flattenDeep, slice, map } from "lodash";
import mongoose from "mongoose";
import ICategoryDb, {
  IPaginatedCategoryResult,
  ICategoryAnalyticsData,
} from "./interfaces/category-db";
import Category from "../database/entities/category";
import ICategory from "../database/interfaces/category";
import { AnalyssisUnit } from "../constants/analysis-unit";

export default function makeCategoryDb({
  categoryDbModel,
  moment,
}: {
  categoryDbModel: mongoose.Model<
    ICategory & mongoose.Document,
    Record<string, unknown>
  >;
  moment: any;
}): ICategoryDb {
  return new (class MongooseCategoryDb implements ICategoryDb {
    async getCategoryAnalystics({
      range = [],
      unit = "day",
      limit = 4,
    }: {
      range?: string[];
      unit?: string;
      limit?: number;
    }): Promise<ICategoryAnalyticsData> {
      const FROM_INDEX = 0;
      const END_INDEX = 1;

      const from_date = range[FROM_INDEX]
        ? moment(range[FROM_INDEX])
        : moment().subtract(1, AnalyssisUnit.YEAR);

      const to_date = moment(range[END_INDEX])
        ? moment(range[END_INDEX])
        : moment();

      const formatted_dates = [];
      const exists_dates = [];

      const total_count = await categoryDbModel.countDocuments({
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
        exists_dates.push(JSON.parse(JSON.stringify(from_date)));
        from_date.add(1, unit);
      }

      const analysis_promises = exists_dates.map(async (date, index) => {
        const start_of = new Date(moment(date, "yyyy-MM-DD").startOf(unit));
        const end_of = new Date(moment(date, "yyyy-MM-DD").endOf(unit));

        const result = await categoryDbModel.aggregate([
          {
            $match: {
              created_at: { $gte: start_of, $lte: end_of },
            },
          },
          {
            $lookup: {
              from: "posts",
              localField: "_id",
              foreignField: "categories",
              as: "posts",
              pipeline: [{ $project: { _id: 1, created_at: 1 } }],
            },
          },
          {
            $project: {
              _id: 1,
              title: 1,
              badge_color: 1,
              created_at: 1,
              total_post_related_count: {
                $size: "$posts",
              },
            },
          },
          {
            $sort: { title: -1 },
          },
        ]);

        return result;
      });

      const results = await Promise.all(analysis_promises);
      const sorted_results = orderBy(
        flattenDeep(results),
        ["total_post_related_count"],
        ["desc"]
      );
      const most_popular_categories = slice(sorted_results, 0, limit);
      const created_category_titles = map(
        sorted_results,
        (category) => category.title
      );
      const created_category_colors = map(
        sorted_results,
        (category) => category.badge_color
      );
      const related_post_counts = map(
        sorted_results,
        (category) => category.total_post_related_count
      );

      return {
        created_category_titles,
        created_category_colors,
        related_post_counts,
        most_popular_categories,
      };
    }

    async findAll(): Promise<ICategory[]> {
      const exists = await categoryDbModel
        .find()
        .populate({
          path: "created_by",
          select: "_id full_name",
        })
        .sort({
          created_at: "desc",
        })
        .lean({ virtuals: true });

      if (exists) {
        return map(exists, (category) => new Category(category));
      }

      return null;
    }

    async findAllForSEO(): Promise<ICategory[]> {
      let query_conditions = {
        deleted_at: { $in: [null, undefined] },
      };

      const exists = await categoryDbModel
        .find(query_conditions)
        .select("_id seo thumbnail_url slug")
        .sort({
          created_at: "desc",
        })
        .lean({ virtuals: true });

      if (exists) {
        return map(exists, (category) => new Category(category));
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
    }): Promise<IPaginatedCategoryResult> {
      const number_of_entries_to_skip = (page - 1) * entries_per_page;

      const query_conditions = {};

      if (query) {
        query_conditions["$or"] = [
          {
            email: { $regex: ".*" + query + ".*", $options: "si" },
          },
        ];
      }

      const exists = await categoryDbModel
        .find(query_conditions)
        .select("-__v")
        .populate({
          path: "created_by",
          select: "_id full_name",
        })
        .skip(number_of_entries_to_skip)
        .limit(entries_per_page)
        .sort({
          created_at: "desc",
        })
        .lean({ virtuals: true });

      const total_count = await categoryDbModel.countDocuments(
        query_conditions
      );

      if (exists) {
        const data = map(exists, (category) => new Category(category));

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

    async findById({ _id }: { _id: string }): Promise<ICategory> {
      const query_conditions = {
        _id,
        deleted_at: { $in: [null, undefined] },
      };

      const exists = await categoryDbModel
        .findOne(query_conditions)
        .select("-__v")
        .populate({
          path: "created_by",
          select: "_id full_name",
        })
        .lean({ virtuals: true });

      if (exists) {
        return new Category(exists);
      }

      return null;
    }

    async findByTitle({ title }: { title: string }): Promise<ICategory> {
      const query_conditions = {
        title,
        deleted_at: { $in: [null, undefined] },
      };

      const exists = await categoryDbModel
        .findOne(query_conditions)
        .select("-__v")
        .lean({ virtuals: true });

      if (exists) {
        return new Category(exists);
      }

      return null;
    }

    async findBySlug({ slug }: { slug: string }): Promise<ICategory> {
      const query_conditions = {
        slug,
        deleted_at: { $in: [null, undefined] },
      };

      const exists = await categoryDbModel
        .findOne(query_conditions)
        .select("-__v")
        .lean({ virtuals: true });

      if (exists) {
        return new Category(exists);
      }

      return null;
    }

    async findOne(): Promise<ICategory> {
      const query_conditions = {
        deleted_at: { $in: [null, undefined] },
      };

      const exists = await categoryDbModel
        .findOne(query_conditions)
        .select("-__v")
        .populate({
          path: "created_by",
          select: "_id full_name",
        })
        .lean({ virtuals: true });

      if (exists) {
        return new Category(exists);
      }

      return null;
    }

    async findAllCategoryTitles(): Promise<
      { _id: string; title: string; slug: string }[]
    > {
      const exists = await categoryDbModel
        .find()
        .select("_id title slug")
        .lean({ virtuals: true });

      const return_data = (category: ICategory) => ({
        _id: category._id,
        title: category.title,
        slug: category.slug,
      });

      if (exists) {
        return map(exists, (category) => return_data(category));
      }

      return null;
    }

    async insert(payload: Partial<ICategory>): Promise<ICategory> {
      const created = await categoryDbModel.create(payload);

      if (created) {
        return new Category(created);
      }

      return null;
    }

    async delete({ _id }: { _id: string }): Promise<ICategory> {
      await categoryDbModel.findOneAndUpdate(
        { _id },
        { deleted_at: new Date() },
        { returnDocument: "after" }
      );

      const updated = await categoryDbModel
        .findOne({ _id })
        .select("_id")
        .lean({ virtuals: true });

      if (updated) {
        return new Category(updated);
      }

      return null;
    }

    async hardDelete({ _id }: { _id: string }): Promise<ICategory> {
      const deleted = await categoryDbModel
        .findByIdAndDelete({ _id })
        .select("_id")
        .lean({ virtuals: true });

      if (deleted) {
        return new Category(deleted);
      }

      return null;
    }

    async update(payload: Partial<ICategory>): Promise<ICategory> {
      const updated = await categoryDbModel
        .findOneAndUpdate({ _id: payload._id }, payload, {
          returnDocument: "after",
        })
        .select("-__v")
        .populate({
          path: "created_by",
          select: "_id full_name",
        })
        .lean({ virtuals: true });

      if (updated) {
        return new Category(updated);
      }

      return null;
    }
  })();
}
