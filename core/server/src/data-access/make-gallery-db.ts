import _ from "lodash";
import mongoose from "mongoose";
import IGalleryDb, { IPaginatedGalleryResult } from "./interfaces/gallery-db";
import Gallery from "../database/entities/gallery";
import IGallery from "../database/interfaces/gallery";

export default function makeGalleryDb({
  galleryDbModel,
  moment,
}: {
  galleryDbModel: mongoose.Model<
    IGallery & mongoose.Document,
    Record<string, unknown>
  >;
  moment: any;
}): IGalleryDb {
  return new (class MongooseGalleryDb implements IGalleryDb {
    async findAllPaginated(
      {
        query = "",
        page = 1,
        entries_per_page = 15,
      }: {
        query: string;
        page: number;
        entries_per_page?: number;
      },
      {
        is_parent,
      }: {
        is_parent: boolean;
      }
    ): Promise<IPaginatedGalleryResult | null> {
      const number_of_entries_to_skip = (page - 1) * entries_per_page;

      const query_conditions = {};

      if (is_parent) {
        query_conditions["parent"] = { $in: [null, undefined] };
      }

      if (query) {
        query_conditions["$or"] = [
          { name: { $regex: ".*" + query + ".*", $options: "si" } },
          { item_name: { $regex: ".*" + query + ".*", $options: "si" } },
        ];
      }

      const existing = await galleryDbModel
        .find(query_conditions)
        .populate("created_by", "-_v")
        .skip(number_of_entries_to_skip)
        .limit(entries_per_page)
        .sort({
          created_at: "desc",
        })
        .lean({ virtuals: true });

      const total_count = await galleryDbModel.countDocuments(query_conditions);

      if (existing) {
        const data = _.map(existing, (post) => new Gallery(post));

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

    async findById({ _id }: { _id: string }): Promise<Gallery | null> {
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

      const existing = await galleryDbModel
        .findOne(query_conditions)
        .lean({ virtuals: true });

      if (existing) {
        return new Gallery(existing);
      }
      return null;
    }

    async findOneByPost({
      post_id,
    }: {
      post_id: string;
    }): Promise<Gallery | null> {
      const mongo_id_regex = new RegExp(/^[0-9a-fA-F]{24}$/i);
      const is_mongo_id = mongo_id_regex.test(post_id);
      if (!is_mongo_id || !post_id) {
        return null;
      }

      const query_conditions = {};

      if (post_id) {
        query_conditions["post"] = post_id;
      }

      const existing = await galleryDbModel
        .findOne(query_conditions)
        .lean({ virtuals: true });

      if (existing) {
        return new Gallery(existing);
      }
      return null;
    }

    async findByPost({
      post_id,
    }: {
      post_id: string;
    }): Promise<Gallery[] | null> {
      const query_conditions = {};

      if (post_id) {
        query_conditions["post"] = post_id;
      }

      const existing = await galleryDbModel
        .find(query_conditions)
        .lean({ virtuals: true });

      if (existing) {
        return _.map(existing, (gallery) => new Gallery(gallery));
      }

      return null;
    }

    async findAllByParent({
      parent_id,
    }: {
      parent_id: string;
    }): Promise<Gallery[] | null> {
      const query_conditions = {};

      if (parent_id) {
        query_conditions["parent"] = parent_id;
      }

      const existing = await galleryDbModel
        .find(query_conditions)
        .lean({ virtuals: true });

      if (existing) {
        return _.map(existing, (gallery) => new Gallery(gallery));
      }

      return null;
    }

    async findOne(): Promise<Gallery | null> {
      const existing = await galleryDbModel.findOne().lean({ virtuals: true });

      if (existing) {
        return new Gallery(existing);
      }

      return null;
    }

    async insert(payload: Partial<IGallery>): Promise<Gallery | null> {
      const updated_payload = payload;

      const result = await galleryDbModel.create([updated_payload]);
      const updated = await galleryDbModel
        .findOne({ _id: result[0]?._id })
        .lean({ virtuals: true });

      if (updated) {
        return new Gallery(updated);
      }
      return null;
    }

    async hardDelete({ _id }: { _id: string }): Promise<Gallery | null> {
      const existing = await galleryDbModel.findOne({ _id });
      await existing.deleteOne();

      const updated = await galleryDbModel
        .findOne({ _id })
        .lean({ virtuals: true });
      if (updated) {
        return new Gallery(updated);
      }
      return null;
    }

    async update(payload: Partial<IGallery>): Promise<Gallery | null> {
      const result = await galleryDbModel
        .findOneAndUpdate({ _id: payload._id }, payload)
        .lean({ virtuals: true });

      const updated = await galleryDbModel
        .findOne({ _id: result?._id })
        .lean({ virtuals: true });

      if (updated) {
        return new Gallery(updated);
      }

      return null;
    }
  })();
}
