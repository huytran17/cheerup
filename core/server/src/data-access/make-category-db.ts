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
    /**
     * @description used by category dashboard
     * FIXME: Currently not in used. To be removed and should never be used.
     * @param param0
     * @returns
     */
    async findAll(): Promise<Category[] | null> {
      let query_conditions = Object.assign({});

      const existing = await categoryDbModel
        .find(query_conditions)
        .populate({
          path: "created_by",
          select: "-__v",
        })
        .populate({
          path: "last_restored_by",
          select: "-__v",
        })
        .populate({
          path: "last_deleted_by",
          seclect: "-__v",
        })
        .sort({
          created_at: "desc",
        })
        .lean({ virtuals: true });
      if (existing) {
        return existing.map((category) => new Category(category));
      }

      return null;
    }
    /**
     *
     * @description used by category API
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
        .populate({
          path: "last_restored_by",
          select: "-__v",
        })
        .populate({
          path: "last_deleted_by",
          seclect: "-__v",
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
        const data = existing.map((category) => new Category(category));

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

    async findById({ _id }: { _id: string }): Promise<Category | null> {
      const mongo_id_regex = new RegExp(/^[0-9a-fA-F]{24}$/i);
      const is_mongo_id = mongo_id_regex.test(_id);
      if (!is_mongo_id || !_id) {
        return null;
      }

      const existing = await categoryDbModel
        .findById(_id)
        .populate({
          path: "created_by",
          select: "-__v",
        })
        .populate({
          path: "last_restored_by",
          select: "-__v",
        })
        .populate({
          path: "last_deleted_by",
          seclect: "-__v",
        })
        .lean({ virtuals: true });

      if (existing) {
        return new Category(existing);
      }
      return null;
    }

    async findOne(): Promise<Category | null> {
      const existing = await categoryDbModel
        .findOne()
        .populate({
          path: "created_by",
          select: "-__v",
        })
        .populate({
          path: "last_restored_by",
          select: "-__v",
        })
        .populate({
          path: "last_deleted_by",
          seclect: "-__v",
        })
        .lean({ virtuals: true });

      if (existing) {
        return new Category(existing);
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
        .populate({
          path: "last_restored_by",
          select: "-__v",
        })
        .populate({
          path: "last_deleted_by",
          seclect: "-__v",
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
