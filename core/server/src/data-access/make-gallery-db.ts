import _ from "lodash";
import mongoose from "mongoose";
import IGalleryDb from "./interfaces/gallery-db";
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
        return existing.map((gallery) => new Gallery(gallery));
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
      const existing = await galleryDbModel.deleteOne({ _id: _id });
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
