import mongoose, { Model } from "mongoose";
import mongoose_lean_virtuals from "mongoose-lean-virtuals";
import ICommentLike, { CommentLikeType } from "../interfaces/comment-like";

const Schema = mongoose.Schema;

const commentLikeSchema = new Schema<ICommentLike, Model<ICommentLike>>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    comment: { type: Schema.Types.ObjectId, ref: "Comment", required: true },
    type: {
      type: String,
      trim: true,
      emum: CommentLikeType,
      default: CommentLikeType.Like,
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
