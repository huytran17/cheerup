import mongoose from "mongoose";
import _ from "lodash";
import mongoose_lean_virtuals from "mongoose-lean-virtuals";

const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    title: { type: String, trim: true },
    description: { type: String, trim: true },
    is_blocked_comment: { type: Boolean, default: false },
    is_published: { type: Boolean, default: false },
    is_highlight: { type: Boolean, default: false },
    thumbnail: { type: Object },
    content: { type: String, trim: true },
    source: { type: String, trim: true },
    tags: [{ type: String, trim: true }],
    author: { type: Schema.Types.ObjectId, ref: "Admin" },
    categories: [{ type: Schema.Types.ObjectId, ref: "Category" }],
    meta: {
      views: { type: Number, default: 0 },
    },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    deleted_at: { type: Date, default: null },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

postSchema.index({ created_at: -1 });

postSchema.virtual("thumbnail_url").get(function () {
  return _.get(this, "thumbnail.meta.location");
});

postSchema.plugin(mongoose_lean_virtuals);

export default postSchema;
