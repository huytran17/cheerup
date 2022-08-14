import mongoose from "mongoose";
import mongoose_lean_virtuals from "mongoose-lean-virtuals";
import _ from "lodash";

const Schema = mongoose.Schema;

const categorySchema = new Schema(
  {
    title: { type: String, trim: true },
    description: { type: String, trim: true },
    created_by: { type: Schema.Types.ObjectId, ref: "Admin" },
    last_deleted_by: { type: Schema.Types.ObjectId, ref: "Admin" },
    last_restored_by: { type: Schema.Types.ObjectId, ref: "Admin" },
    thumbnail: { type: Object },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    deleted_at: { type: Date, default: null },
    last_restored_at: { type: Date, default: null },
  },
  {
    toJSON: { virtuals: true },
  }
);

categorySchema.virtual("thumbnail_url").get(function () {
  const thumbnail_location = _.get(this, "thumbnail.meta.location");
  return thumbnail_location;
});

categorySchema.plugin(mongoose_lean_virtuals);

export default categorySchema;
