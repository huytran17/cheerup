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
  },
  {
    toJSON: { virtuals: true },
    timestamps: {
      createdAt: "created_at",
    },
  }
);

commentLikeSchema.index({ created_at: -1 });

commentLikeSchema.plugin(mongoose_lean_virtuals);

export default commentLikeSchema;
