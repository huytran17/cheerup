import _ from "lodash";
import mongoose from "mongoose";
import IAdminDb, { PaginatedAdminResult } from "./interfaces/admin-db";
import Admin from "../database/entities/admin";
import IAdmin from "../database/interfaces/admin";

export default function makeAdminDb({
  adminDbModel,
  moment,
}: {
  adminDbModel: mongoose.Model<
    IAdmin & mongoose.Document,
    Record<string, unknown>
  >;
  moment: any;
}): IAdminDb {
  return new (class MongooseAdminDb implements IAdminDb {
    /**
     *
     * @description used by admin API
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
    }): Promise<PaginatedAdminResult | null> {
      const number_of_entries_to_skip = (page - 1) * entries_per_page;

      const query_conditions = { deleted_at: undefined };

      if (query) {
        Object.defineProperty(query_conditions, "$or", {
          value: [{ email: { $regex: ".*" + query + ".*", $options: "si" } }],
          writable: false,
        });
      }

      const existing = await adminDbModel
        .find(query_conditions)
        .skip(number_of_entries_to_skip)
        .limit(entries_per_page)
        .sort({
          created_at: "desc",
        })
        .lean({ virtuals: true });

      const total_count = await adminDbModel.countDocuments(query_conditions);

      if (existing) {
        const data = existing.map((admin) => new Admin(admin));

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

    async findById({ _id }: { _id: string }): Promise<Admin | null> {
      const mongo_id_regex = new RegExp(/^[0-9a-fA-F]{24}$/i);
      const is_mongo_id = mongo_id_regex.test(_id);
      if (!is_mongo_id || !_id) {
        return null;
      }

      const existing = await adminDbModel
        .findById(_id)
        .lean({ virtuals: true });

      if (existing) {
        return new Admin(existing);
      }
      return null;
    }

    async findOne(): Promise<Admin | null> {
      const existing = await adminDbModel.findOne().lean({ virtuals: true });

      if (existing) {
        return new Admin(existing);
      }

      return null;
    }

    async findByEmail({ email }: { email: string }): Promise<Admin | null> {
      const query_conditions = {
        email,
        deleted_at: undefined,
      };
      const existing = await adminDbModel.findOne(query_conditions);

      if (existing) {
        return new Admin(existing);
      }
      return null;
    }

    async insert(payload: Partial<IAdmin>): Promise<Admin | null> {
      const updated_payload = payload;

      const result = await adminDbModel.create([updated_payload]);
      const updated = await adminDbModel
        .findOne({ _id: result[0]?._id })
        .lean({ virtuals: true });

      if (updated) {
        return new Admin(updated);
      }
      return null;
    }

    async delete({ _id }: { _id: string }): Promise<Admin | null> {
      const existing = await adminDbModel.findOneAndUpdate(
        { _id },
        { deleted_at: new Date() }
      );
      const updated = await adminDbModel
        .findOne({ _id })
        .lean({ virtuals: true });
      if (updated) {
        return new Admin(updated);
      }
      return null;
    }

    async hardDelete({ _id }: { _id: string }): Promise<Admin | null> {
      const existing = await adminDbModel.deleteOne({ _id: _id });
      const updated = await adminDbModel
        .findOne({ _id })
        .lean({ virtuals: true });
      if (updated) {
        return new Admin(updated);
      }
      return null;
    }

    async update(payload: Partial<IAdmin>): Promise<Admin | null> {
      const result = await adminDbModel
        .findOneAndUpdate({ _id: payload._id }, payload)
        .lean({ virtuals: true });

      const updated = await adminDbModel
        .findOne({ _id: result?._id })
        .lean({ virtuals: true });

      if (updated) {
        return new Admin(updated);
      }

      return null;
    }
  })();
}
