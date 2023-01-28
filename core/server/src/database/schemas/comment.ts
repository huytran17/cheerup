import mongoose from "mongoose";
import mongoose_lean_virtuals from "mongoose-lean-virtuals";
import _ from "lodash";
import { isEmpty } from "../../utils/is-empty";
import { CommentLikeModel, CommentModel } from "../../data-access/models";

const Schema = mongoose.Schema;

const commentSchema = new Schema({
  content: { type: String, trim: true },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  post: { type: Schema.Types.ObjectId, ref: "Post" },
  parent: { type: Schema.Types.ObjectId, ref: "Comment" },
  children: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  reports: [
    {
      created_by: { type: Schema.Types.ObjectId, ref: "User" },
      created_at: { type: Date, default: Date.now },
      reasons: [
        {
          main_reason: { type: String, trim: true },
          other_reason: { type: String, trim: true },
        },
      ],
    },
  ],
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  deleted_at: { type: Date, default: null },
});

commentSchema.index({ created_at: -1 });

commentSchema.virtual("is_parent").get(function () {
  return isEmpty(_.get(this, "parent"));
});

commentSchema.pre("deleteOne", { document: true }, async function (next) {
  const children = _.get(this, "children", []);
  const delete_children_promises = children.map(
    async (comment: mongoose.ObjectId) => {
      const comment_document = await CommentModel.findOne({
        _id: comment.toString(),
      });

      return await comment_document?.deleteOne();
    }
  );

  const comment_likes = await CommentLikeModel.find({
    comment: _.get(this, "_id"),
  });

  const delete_comment_like_promises = comment_likes.map(
    async (comment_like) => comment_like && (await comment_like.deleteOne())
  );

  await Promise.all([delete_children_promises, delete_comment_like_promises]);

  next();
});

commentSchema.plugin(mongoose_lean_virtuals);

export default commentSchema;
