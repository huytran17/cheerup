import mongoose, { Model } from "mongoose";
import mongoose_lean_virtuals from "mongoose-lean-virtuals";
import IPostBookmark from "../interfaces/post-bookmark";

const Schema = mongoose.Schema;

const postBookmarkSchema = new Schema<IPostBookmark, Model<IPostBookmark>>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
  },
  {
    toJSON: { virtuals: true },
  }
);

postBookmarkSchema.index({ created_at: -1 });

postBookmarkSchema.plugin(mongoose_lean_virtuals);

export default postBookmarkSchema;
