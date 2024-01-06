import mongoose, { Model } from "mongoose";
import mongoose_lean_virtuals from "mongoose-lean-virtuals";
import { get, map } from "lodash";
import { isEmpty } from "../../utils/is-empty";
import { CommentLikeModel, CommentModel } from "../../data-access/models";
import IComment from "../interfaces/comment";

const Schema = mongoose.Schema;

const commentSchema = new Schema<IComment, Model<IComment>>(
  {
    content: { type: String, trim: true, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
    parent: { type: Schema.Types.ObjectId, ref: "Comment" },
    children: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  },
  {
    toJSON: { virtuals: true },
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

commentSchema.index({ created_at: -1 });

commentSchema.virtual("is_parent").get(function () {
  return isEmpty(get(this, "parent"));
});

commentSchema.virtual("has_children").get(function () {
  return !isEmpty(get(this, "children"));
});

commentSchema.pre("deleteOne", { document: true }, async function (next) {
  const children = get(this, "children", []);
  const delete_children_promises = map(
    children,
    async (comment: mongoose.ObjectId) => {
      const comment_document = await CommentModel.findOne({
        _id: comment,
      });

      return await comment_document?.deleteOne();
    }
  );

  const delete_comment_like_promises = await CommentLikeModel.deleteMany({
    comment: get(this, "_id"),
  });

  await Promise.all([delete_children_promises, delete_comment_like_promises]);

  next();
});

commentSchema.plugin(mongoose_lean_virtuals);

export default commentSchema;
