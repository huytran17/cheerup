import mongoose from "mongoose";
import mongoose_lean_virtuals from "mongoose-lean-virtuals";
import { GalleryModel } from "../../data-access/models";
import { map, get } from "lodash";
import deleteS3Object from "../../utils/delete-s3-object";

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
  const items = get(this, "items", []);

  for (const item of items) {
    deleteS3Object({ bucket: item.bucket, key: item.key });
  }

  const galleries = await GalleryModel.find({ parent: get(this, "_id") });
  const delete_gallery_promises = map(
    galleries,
    async (doc) => await doc.deleteOne()
  );

  await Promise.all(delete_gallery_promises);

  next();
});

export default gallerySchema;
