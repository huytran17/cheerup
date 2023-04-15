import mongoose from "mongoose";
import mongoose_lean_virtuals from "mongoose-lean-virtuals";
import _ from "lodash";

const Schema = mongoose.Schema;

const categorySchema = new Schema(
  {
    title: { type: String, trim: true },
    badge_color: { type: String, trim: true, default: "#FF2E55" },
    description: { type: String, trim: true },
    created_by: { type: Schema.Types.ObjectId, ref: "Admin" },
    thumbnail: { type: Object },
    seo: { type: Object },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    deleted_at: { type: Date, default: null },
  },
  {
    toJSON: { virtuals: true },
  }
);

categorySchema.index({ created_at: -1 });

categorySchema.virtual("thumbnail_url").get(function () {
  return _.get(this, "thumbnail.location");
});

categorySchema.plugin(mongoose_lean_virtuals);

export default categorySchema;
