import mongoose from "mongoose";
import mongoose_lean_virtuals from "mongoose-lean-virtuals";

const Schema = mongoose.Schema;

const commentLikeSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    comment: { type: Schema.Types.ObjectId, ref: "Comment", required: true },
    type: {
      type: String,
      trim: true,
      emum: ["like", "dislike"],
      default: "like",
    },
    created_at: { type: Date, default: Date.now },
  },
  {
    toJSON: { virtuals: true },
  }
);

commentLikeSchema.index({ created_at: -1, comment: 1 });

commentLikeSchema.plugin(mongoose_lean_virtuals);

export default commentLikeSchema;
