import _ from "lodash";
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
      const existing_dates = [];

      const total_count = await categoryDbModel.countDocuments({
        created_at: {
          $gte: moment(from_date, "yyyy-MM-DD").startOf(unit),
          $lte: moment(to_date, "yyyy-MM-DD").endOf(unit),
        },
      });

      const cloned_from_date = _.cloneDeep(from_date);
      while (cloned_from_date.isSameOrBefore(to_date, unit)) {
        let formatted_date = cloned_from_date.format("YYYY-MM-DD");

        switch (unit) {
          case AnalyssisUnit.MONTH:
            formatted_date = cloned_from_date.format("YYYY-MM");
            break;
          case AnalyssisUnit.YEAR:
            formatted_date = cloned_from_date.format("YYYY");
            break;
          default:
            break;
        }

        formatted_dates.push(formatted_date);
        existing_dates.push(JSON.parse(JSON.stringify(cloned_from_date)));
        cloned_from_date.add(1, unit);
      }

      const analysis_promises = existing_dates.map(async (date, index) => {
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
      const sorted_results = _.orderBy(
        _.flattenDeep(results),
        ["total_post_related_count"],
        ["desc"]
      );
      const most_popular_categories = _.slice(sorted_results, 0, limit);
      const created_category_titles = _.map(
        sorted_results,
        (category) => category.title
      );
      const created_category_colors = _.map(
        sorted_results,
        (category) => category.badge_color
      );
      const related_post_counts = _.map(
        sorted_results,
        (category) => category.total_post_related_count
      );

      return {
        created_categories: sorted_results,
        created_category_titles,
        created_category_colors,
        related_post_counts,
        most_popular_categories,
        formatted_dates,
        total_count,
      };
    }

    async findAll(): Promise<Category[] | null> {
      let query_conditions = {};

      const existing = await categoryDbModel
        .find(query_conditions)
        .populate({
          path: "created_by",
          select: "-__v",
        })
        .sort({
          created_at: "desc",
        })
        .lean({ virtuals: true });

      if (existing) {
        return _.map(existing, (category) => new Category(category));
      }

      return null;
    }

    async findAllForSEO(): Promise<Category[] | null> {
      let query_conditions = {
        deleted_at: { $in: [null, undefined] },
      };

      const existing = await categoryDbModel
        .find(query_conditions)
        .select("_id seo")
        .sort({
          created_at: "desc",
        })
        .lean({ virtuals: true });

      if (existing) {
        return _.map(existing, (category) => new Category(category));
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
    }): Promise<IPaginatedCategoryResult | null> {
      const number_of_entries_to_skip = (page - 1) * entries_per_page;

      const query_conditions = {};

      if (query) {
        query_conditions["$or"] = [
          {
            email: { $regex: ".*" + query + ".*", $options: "si" },
          },
        ];
      }

      const existing = await categoryDbModel
        .find(query_conditions)
        .populate({
          path: "created_by",
          select: "-__v",
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

      if (existing) {
        const data = _.map(existing, (category) => new Category(category));

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
      is_include_deleted = true,
    }: {
      _id: string;
      is_include_deleted?: boolean;
    }): Promise<Category | null> {
      const mongo_id_regex = new RegExp(/^[0-9a-fA-F]{24}$/i);
      const is_mongo_id = mongo_id_regex.test(_id);
      if (!is_mongo_id || !_id) {
        return null;
      }

      const query_conditions = {
        deleted_at: { $in: [null, undefined] },
      };

      is_include_deleted && delete query_conditions.deleted_at;

      _id && (query_conditions["_id"] = _id);

      const existing = await categoryDbModel
        .findOne(query_conditions)
        .populate({
          path: "created_by",
          select: "-__v",
        })
        .lean({ virtuals: true });

      if (existing) {
        return new Category(existing);
      }

      return null;
    }

    async findByTitle({
      title,
      is_include_deleted = true,
    }: {
      title: string;
      is_include_deleted?: boolean;
    }): Promise<Category | null> {
      const query_conditions = {
        deleted_at: { $in: [null, undefined] },
      };

      is_include_deleted && delete query_conditions.deleted_at;

      title && (query_conditions["title"] = title);

      const existing = await categoryDbModel
        .findOne(query_conditions)
        .lean({ virtuals: true });

      if (existing) {
        return new Category(existing);
      }

      return null;
    }

    async findOne(): Promise<Category | null> {
      const query_conditions = {
        deleted_at: { $in: [null, undefined] },
      };

      const existing = await categoryDbModel
        .findOne(query_conditions)
        .populate({
          path: "created_by",
          select: "-__v",
        })
        .lean({ virtuals: true });

      if (existing) {
        return new Category(existing);
      }

      return null;
    }

    async findAllCategoryTitles(): Promise<{ _id: string; title: string }[]> {
      const existing = await categoryDbModel
        .find()
        .select("_id title")
        .lean({ virtuals: true });

      if (existing) {
        return _.map(existing, (category) => ({
          _id: category._id,
          title: category.title,
        }));
      }

      return null;
    }

    async insert(payload: Partial<ICategory>): Promise<Category | null> {
      const updated_payload = payload;

      const result = await categoryDbModel.create([updated_payload]);
      const updated = await categoryDbModel
        .findOne({ _id: result[0]?._id })
        .lean({ virtuals: true });

      if (updated) {
        return new Category(updated);
      }

      return null;
    }

    async delete({ _id }: { _id: string }): Promise<Category | null> {
      const existing = await categoryDbModel.findOneAndUpdate(
        { _id },
        { deleted_at: new Date() }
      );
      const updated = await categoryDbModel
        .findOne({ _id })
        .lean({ virtuals: true });

      if (updated) {
        return new Category(updated);
      }
      return null;
    }

    async hardDelete({ _id }: { _id: string }): Promise<Category | null> {
      const existing = await categoryDbModel.deleteOne({ _id: _id });
      const updated = await categoryDbModel
        .findOne({ _id })
        .lean({ virtuals: true });

      if (updated) {
        return new Category(updated);
      }

      return null;
    }

    async update(payload: Partial<ICategory>): Promise<Category | null> {
      const result = await categoryDbModel
        .findOneAndUpdate({ _id: payload._id }, payload)
        .populate({
          path: "created_by",
          select: "-__v",
        })
        .lean({ virtuals: true });

      const updated = await categoryDbModel
        .findOne({ _id: result?._id })
        .lean({ virtuals: true });

      if (updated) {
        return new Category(updated);
      }

      return null;
    }
  })();
}
