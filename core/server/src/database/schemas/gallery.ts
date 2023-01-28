import mongoose from "mongoose";
import mongoose_lean_virtuals from "mongoose-lean-virtuals";
import { GalleryModel } from "../../data-access/models";
import Storage from "../../config/storage";
import _ from "lodash";

const Schema = mongoose.Schema;

const gallerySchema = new Schema(
  {
    name: { type: String, trim: true, required: true },
    parent: { type: Schema.Types.ObjectId, ref: "Gallery" },
    items: [{ type: Schema.Types.Mixed }],
    created_by: { type: Schema.Types.ObjectId, ref: "Admin" },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
  },
  {
    toJSON: { virtuals: true },
  }
);

gallerySchema.index({ created_at: -1 });

gallerySchema.plugin(mongoose_lean_virtuals);

gallerySchema.pre("deleteOne", { document: true }, async function (next) {
  const items = _.get(this, "items", []);

  for (const item of items) {
    const s3_params = {
      Bucket: item.bucket,
      Key: item.key,
    };

    Storage.deleteS3Object(s3_params);
  }

  const galleries = await GalleryModel.find({ parent: _.get(this, "_id") });
  const delete_gallery_promises = galleries.map(async (doc) => {
    await doc.deleteOne();
  });

  await Promise.all(delete_gallery_promises);

  next();
});

export default gallerySchema;
