import _ from "lodash";
import mongoose from "mongoose";
import IAdminDb, {
  IPaginatedAdminResult,
  IAdminAnalyticsData,
} from "./interfaces/admin-db";
import Admin from "../database/entities/admin";
import IAdmin, { AdminType } from "../database/interfaces/admin";
import { AnalyssisUnit } from "../constants/analysis-unit";

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
    async getAdminAnalystics({
      author_type = AdminType.Owner,
      range = [],
      unit = "day",
    }: {
      author_type?: AdminType;
      range?: string[];
      unit?: string;
    }): Promise<IAdminAnalyticsData> {
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
      const total_post_created_counts = [];
      const total_created_counts = [];
      const total_deleted_counts = [];
      const total_editor_counts = [];
      const total_owner_counts = [];
      const total_collaborator_counts = [];

      const total_count = await adminDbModel.countDocuments({
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

        const result = await adminDbModel.aggregate([
          {
            $facet: {
              total_post_created: [
                {
                  $match: {
                    created_at: { $gte: start_of, $lte: end_of },
                    type: author_type,
                  },
                },
                {
                  $lookup: {
                    from: "posts",
                    localField: "_id",
                    foreignField: "author",
                    as: "posts",
                    pipeline: [{ $project: { _id: 1, created_at: 1 } }],
                  },
                },
                {
                  $project: {
                    _id: 1,
                    total_post_created_count: {
                      $size: {
                        $filter: {
                          input: "$posts",
                          as: "post",
                          cond: {
                            $and: [
                              {
                                $gte: [
                                  "$$post.created_at",
                                  new Date(from_date.startOf(unit)),
                                ],
                              },
                              {
                                $lte: [
                                  "$$post.created_at",
                                  new Date(to_date.endOf(unit)),
                                ],
                              },
                            ],
                          },
                        },
                      },
                    },
                  },
                },
              ],
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
                    deleted_at: { $gte: start_of, $lte: end_of },
                  },
                },
                {
                  $count: "total_deleted_count",
                },
              ],

              total_owner: [
                {
                  $match: {
                    type: AdminType.Owner,
                    deleted_at: { $in: [null, undefined] },
                    created_at: { $gte: start_of, $lte: end_of },
                  },
                },
                {
                  $count: "total_owner_count",
                },
              ],

              total_collaborator: [
                {
                  $match: {
                    type: AdminType.Collaborator,
                    deleted_at: { $in: [null, undefined] },
                    created_at: { $gte: start_of, $lte: end_of },
                  },
                },
                {
                  $count: "total_collaborator_count",
                },
              ],

              total_editor: [
                {
                  $match: {
                    type: AdminType.Editor,
                    deleted_at: { $in: [null, undefined] },
                    created_at: { $gte: start_of, $lte: end_of },
                  },
                },
                {
                  $count: "total_editor_count",
                },
              ],
            },
          },
        ]);

        result.push({ order: index });

        return result;
      });

      const results = await Promise.all(analysis_promises);
      const sorted_results = _.sortBy(results, ["order"]);

      for (const result of sorted_results) {
        const total_post_created_count =
          result[0]?.total_post_created[0]?.total_post_created_count || 0;
        total_post_created_counts.push(total_post_created_count);

        const total_created_count =
          result[0]?.total_created[0]?.total_created_count || 0;
        total_created_counts.push(total_created_count);

        const total_deleted_count =
          result[0]?.total_created[0]?.total_deleted_count || 0;
        total_deleted_counts.push(total_deleted_count);

        const total_owner_count =
          result[0]?.total_created[0]?.total_owner_count || 0;
        total_owner_counts.push(total_owner_count);

        const total_collaborator_count =
          result[0]?.total_created[0]?.total_collaborator_count || 0;
        total_collaborator_counts.push(total_collaborator_count);

        const total_editor_count =
          result[0]?.total_created[0]?.total_editor_count || 0;
        total_editor_counts.push(total_editor_count);
      }

      return {
        total_post_created_counts,
        total_created_counts,
        total_deleted_counts,
        total_owner_counts,
        total_collaborator_counts,
        total_editor_counts,
        formatted_dates,
        total_count,
      };
    }

    async findAll(): Promise<Admin[] | null> {
      let query_conditions = Object.assign({});

      const existing = await adminDbModel
        .find(query_conditions)
        .lean({ virtuals: true });
      if (existing) {
        return _.map(existing, (admin) => new Admin(admin));
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
    }): Promise<IPaginatedAdminResult | null> {
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
        const data = _.map(existing, (admin) => new Admin(admin));

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
        deleted_at: { $in: [null, undefined] },
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
      const existing = await adminDbModel.deleteOne({ _id });
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
