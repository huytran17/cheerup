import _ from "lodash";
import mongoose from "mongoose";
import ICategoryDb, { PaginatedCategoryResult } from "./interfaces/category-db";
import Category from "../database/entities/category";
import ICategory from "../database/interfaces/category";

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
    async findAll(): Promise<Category[] | null> {
      let query_conditions = Object.assign({});

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

    async findAllPaginated({
      query = "",
      page = 1,
      entries_per_page = 15,
    }: {
      query: string;
      page: number;
      entries_per_page?: number;
    }): Promise<PaginatedCategoryResult | null> {
      const number_of_entries_to_skip = (page - 1) * entries_per_page;

      const query_conditions = Object.assign({});

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

      if (is_include_deleted) {
        delete query_conditions.deleted_at;
      }

      if (_id) {
        query_conditions["_id"] = _id;
      }

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
