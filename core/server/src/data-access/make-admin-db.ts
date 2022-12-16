import _ from "lodash";
import mongoose from "mongoose";
import IAdminDb, {
  PaginatedAdminResult,
  IAdminAnalyticsData,
} from "./interfaces/admin-db";
import Admin from "../database/entities/admin";
import IAdmin, { AdminType } from "../database/interfaces/admin";

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
     * get the number of resumes daily for past "distance & unit" (including today)
     * @param param0
     * @returns
     */
    async getAdminAnalystics({
      distance = 7,
      unit = "day",
    }: {
      distance?: number;
      unit?: string;
    }): Promise<IAdminAnalyticsData> {
      const from_date_formatted = moment().subtract(distance, unit);
      const to_date_formatted = moment();
      const formatted_dates = [];
      const total_created_counts = [];
      const total_deleted_counts = [];
      const total_super_admin_counts = [];
      const total_normal_admin_counts = [];
      const total_verified_email_counts = [];

      const query_conditions = {};

      const total_count = await adminDbModel.countDocuments({
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
          total_super_admin_count,
          total_normal_admin_count,
          total_verified_email_count,
        ] = await Promise.all([
          adminDbModel.countDocuments({
            ...query_conditions,
            deleted_at: {
              $gte: moment(from_date_formatted, "yyyy-MM-DD").startOf(unit),
              $lte: moment(from_date_formatted, "yyyy-MM-DD").endOf(unit),
            },
          }),
          adminDbModel.countDocuments({
            ...query_conditions,
            created_at: {
              $gte: moment(from_date_formatted, "yyyy-MM-DD").startOf(unit),
              $lte: moment(from_date_formatted, "yyyy-MM-DD").endOf(unit),
            },
          }),
          adminDbModel.countDocuments({
            ...query_conditions,
            type: AdminType.Super,
            deleted_at: { $in: [null, undefined] },
            created_at: {
              $gte: moment(from_date_formatted, "yyyy-MM-DD").startOf(unit),
              $lte: moment(from_date_formatted, "yyyy-MM-DD").endOf(unit),
            },
          }),
          adminDbModel.countDocuments({
            ...query_conditions,
            type: AdminType.Normal,
            deleted_at: { $in: [null, undefined] },
            created_at: {
              $gte: moment(from_date_formatted, "yyyy-MM-DD").startOf(unit),
              $lte: moment(from_date_formatted, "yyyy-MM-DD").endOf(unit),
            },
          }),
          adminDbModel.countDocuments({
            ...query_conditions,
            type: AdminType.Normal,
            deleted_at: { $in: [null, undefined] },
            created_at: {
              $gte: moment(from_date_formatted, "yyyy-MM-DD").startOf(unit),
              $lte: moment(from_date_formatted, "yyyy-MM-DD").endOf(unit),
            },
          }),
        ]);

        total_created_counts.push(total_created_count);
        total_deleted_counts.push(total_deleted_count);
        total_super_admin_counts.push(total_super_admin_count);
        total_normal_admin_counts.push(total_normal_admin_count);
        total_verified_email_counts.push(total_verified_email_count);
        from_date_formatted.add(1, unit);
      }
      return {
        total_created_counts,
        total_deleted_counts,
        total_super_admin_counts,
        total_normal_admin_counts,
        formatted_dates,
        total_count,
        total_verified_email_counts,
      };
    }
    /**
     * @description used by admin dashboard
     * FIXME: Currently not in used. To be removed and should never be used.
     * @param param0
     * @returns
     */
    async findAll(): Promise<Admin[] | null> {
      let query_conditions = Object.assign({});

      const existing = await adminDbModel
        .find(query_conditions)
        .lean({ virtuals: true });
      if (existing) {
        return existing.map((admin) => new Admin(admin));
      }

      return null;
    }
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

      const query_conditions = Object.assign({});

      if (query) {
        query_conditions["$or"] = [
          {
            email: { $regex: ".*" + query + ".*", $options: "si" },
          },
        ];
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

      const query_conditions = {
        deleted_at: { $in: [null, undefined] },
      };

      if (_id) {
        query_conditions["_id"] = _id;
      }

      const existing = await adminDbModel
        .findOne(query_conditions)
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
