import _ from "lodash";
import mongoose from "mongoose";
import IFeedbackDb, { PaginatedFeedbackResult } from "./interfaces/feedback-db";
import Feedback from "../database/entities/feedback";
import IFeedback from "../database/interfaces/feedback";

export default function makeFeedbackDb({
  feedbackDbModel,
  moment,
}: {
  feedbackDbModel: mongoose.Model<
    IFeedback & mongoose.Document,
    Record<string, unknown>
  >;
  moment: any;
}): IFeedbackDb {
  return new (class MongooseFeedbackDb implements IFeedbackDb {
    /**
     * @description used by feedback dashboard
     * FIXME: Currently not in used. To be removed and should never be used.
     * @param param0
     * @returns
     */
    async findAll(): Promise<Feedback[] | null> {
      let query_conditions = Object.assign({});

      const existing = await feedbackDbModel
        .find(query_conditions)
        .populate("created_by", "-_v")
        .lean({ virtuals: true });

      if (existing) {
        return existing.map((feedback) => new Feedback(feedback));
      }

      return null;
    }
    /**
     *
     * @description used by feedback API
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
    }): Promise<PaginatedFeedbackResult | null> {
      const number_of_entries_to_skip = (page - 1) * entries_per_page;

      const query_conditions = Object.assign({});

      if (query) {
        query_conditions["$or"] = [
          {
            email: { $regex: ".*" + query + ".*", $options: "si" },
          },
        ];
      }

      const existing = await feedbackDbModel
        .find(query_conditions)
        .populate("created_by", "-_v")
        .skip(number_of_entries_to_skip)
        .limit(entries_per_page)
        .sort({
          created_at: "desc",
        })
        .lean({ virtuals: true });

      const total_count = await feedbackDbModel.countDocuments(
        query_conditions
      );

      if (existing) {
        const data = existing.map((feedback) => new Feedback(feedback));

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

    async findById({ _id }: { _id: string }): Promise<Feedback | null> {
      const mongo_id_regex = new RegExp(/^[0-9a-fA-F]{24}$/i);
      const is_mongo_id = mongo_id_regex.test(_id);
      if (!is_mongo_id || !_id) {
        return null;
      }

      const existing = await feedbackDbModel
        .findById(_id)
        .populate("created_by", "-_v")
        .lean({ virtuals: true });

      if (existing) {
        return new Feedback(existing);
      }
      return null;
    }

    async findOne(): Promise<Feedback | null> {
      const existing = await feedbackDbModel
        .findOne()
        .populate("created_by", "-_v")
        .lean({ virtuals: true });

      if (existing) {
        return new Feedback(existing);
      }

      return null;
    }

    async insert(payload: Partial<IFeedback>): Promise<Feedback | null> {
      const updated_payload = payload;

      const result = await feedbackDbModel.create([updated_payload]);
      const updated = await feedbackDbModel
        .findOne({ _id: result[0]?._id })
        .lean({ virtuals: true });

      if (updated) {
        return new Feedback(updated);
      }
      return null;
    }

    async delete({ _id }: { _id: string }): Promise<Feedback | null> {
      const existing = await feedbackDbModel.findOneAndUpdate(
        { _id },
        { deleted_at: new Date() }
      );
      const updated = await feedbackDbModel
        .findOne({ _id })
        .lean({ virtuals: true });
      if (updated) {
        return new Feedback(updated);
      }
      return null;
    }

    async hardDelete({ _id }: { _id: string }): Promise<Feedback | null> {
      const existing = await feedbackDbModel.deleteOne({ _id: _id });
      const updated = await feedbackDbModel
        .findOne({ _id })
        .lean({ virtuals: true });
      if (updated) {
        return new Feedback(updated);
      }
      return null;
    }

    async update(payload: Partial<IFeedback>): Promise<Feedback | null> {
      const result = await feedbackDbModel
        .findOneAndUpdate({ _id: payload._id }, payload)
        .populate("created_by", "-_v")
        .lean({ virtuals: true });

      const updated = await feedbackDbModel
        .findOne({ _id: result?._id })
        .lean({ virtuals: true });

      if (updated) {
        return new Feedback(updated);
      }

      return null;
    }
  })();
}
