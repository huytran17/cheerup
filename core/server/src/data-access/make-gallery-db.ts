import { map } from "lodash";
import mongoose from "mongoose";
import Gallery from "../database/entities/gallery";
import IGallery from "../database/interfaces/gallery";
import IGalleryDb, { IPaginatedGalleryResult } from "./interfaces/gallery-db";

export default function makeGalleryDb({
  galleryDbModel,
}: {
  galleryDbModel: mongoose.Model<
    IGallery & mongoose.Document,
    Record<string, unknown>
  >;
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
    ): Promise<IPaginatedGalleryResult> {
      const number_of_entries_to_skip = (page - 1) * entries_per_page;

      const query_conditions = {};

      is_parent && (query_conditions["parent"] = { $in: [null, undefined] });

      if (query) {
        query_conditions["$or"] = [
          { name: { $regex: ".*" + query + ".*", $options: "si" } },
          { item_name: { $regex: ".*" + query + ".*", $options: "si" } },
        ];
      }

      const exists = await galleryDbModel
        .find(query_conditions)
        .populate("created_by", "_id full_name")
        .select("-__v")
        .skip(number_of_entries_to_skip)
        .limit(entries_per_page)
        .sort({
          created_at: "desc",
        })
        .lean({ virtuals: true });

      const total_count = await galleryDbModel.countDocuments(query_conditions);

      if (exists) {
        const data = map(exists, (post) => new Gallery(post));

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

    async findById({ _id }: { _id: string }): Promise<IGallery> {
      const query_conditions = {
        _id,
        deleted_at: { $in: [null, undefined] },
      };

      const exists = await galleryDbModel
        .findOne(query_conditions)
        .select("-__v")
        .lean({ virtuals: true });

      if (exists) {
        return new Gallery(exists);
      }

      return null;
    }

    async findOneByPost({ post_id }: { post_id: string }): Promise<IGallery> {
      const query_conditions = {
        post: post_id,
      };

      const exists = await galleryDbModel
        .findOne(query_conditions)
        .select("-__v")
        .lean({ virtuals: true });

      if (exists) {
        return new Gallery(exists);
      }

      return null;
    }

    async findByPost({ post_id }: { post_id: string }): Promise<IGallery[]> {
      const query_conditions = {
        post: post_id,
      };

      const exists = await galleryDbModel
        .find(query_conditions)
        .select("-__v")
        .lean({ virtuals: true });

      if (exists) {
        return map(exists, (gallery) => new Gallery(gallery));
      }

      return null;
    }

    async findAllByParent({
      parent_id,
    }: {
      parent_id: string;
    }): Promise<IGallery[]> {
      const query_conditions = {
        parent: parent_id,
      };

      const exists = await galleryDbModel
        .find(query_conditions)
        .select("-__v")
        .lean({ virtuals: true });

      if (exists) {
        return map(exists, (gallery) => new Gallery(gallery));
      }

      return null;
    }

    async findOne(): Promise<IGallery> {
      const exists = await galleryDbModel.findOne().lean({ virtuals: true });

      if (exists) {
        return new Gallery(exists);
      }

      return null;
    }

    async insert(payload: Partial<IGallery>): Promise<IGallery> {
      const created = await galleryDbModel.create(payload);

      if (created) {
        return new Gallery(created);
      }
      return null;
    }

    async hardDelete({ _id }: { _id: string }): Promise<IGallery> {
      const exists = await galleryDbModel.findById({ _id });

      exists && (await exists.deleteOne());

      return null;
    }

    async update(payload: Partial<IGallery>): Promise<IGallery> {
      const updated = await galleryDbModel
        .findOneAndUpdate({ _id: payload._id }, payload, {
          returnDocument: "after",
        })
        .select("-__v")
        .lean({ virtuals: true });

      if (updated) {
        return new Gallery(updated);
      }

      return null;
    }
  })();
}
