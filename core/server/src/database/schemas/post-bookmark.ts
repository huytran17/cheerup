import mongoose from "mongoose";
import mongoose_lean_virtuals from "mongoose-lean-virtuals";

const Schema = mongoose.Schema;

const postBookmarkSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    deleted_at: { type: Date, default: null },
  },
  {
    toJSON: { virtuals: true },
  }
);

postBookmarkSchema.index({ created_at: -1 });

postBookmarkSchema.plugin(mongoose_lean_virtuals);

export default postBookmarkSchema;
