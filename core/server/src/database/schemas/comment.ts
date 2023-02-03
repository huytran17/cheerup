import mongoose from "mongoose";
import mongoose_lean_virtuals from "mongoose-lean-virtuals";
import _ from "lodash";
import { isEmpty } from "../../utils/is-empty";
import { CommentLikeModel, CommentModel } from "../../data-access/models";
import IComment from "../interfaces/comment";

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
});

commentSchema.index({ created_at: -1 });

commentSchema.virtual("is_parent").get(function () {
  return isEmpty(_.get(this, "parent"));
});

commentSchema.virtual("has_children").get(function () {
  return !isEmpty(_.get(this, "children"));
});

commentSchema.pre("deleteOne", { document: true }, async function (next) {
  const children = _.get(this, "children", []);
  const delete_children_promises = _.map(
    children,
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

  const delete_comment_like_promises = _.map(
    comment_likes,
    async (comment_like) => comment_like && (await comment_like.deleteOne())
  );

  const is_child = !!this.parent;
  if (is_child) {
    const parent_comment = await CommentModel.findOne({
      _id: this.parent.toString(),
    });

    const parents_children: IComment[] = _.get(parent_comment, "children", []);
    const new_parents_children: IComment[] = _.filter(
      parents_children,
      (comment_id) => comment_id.toString() !== this._id.toString()
    );

    const updated_parent_comment: Partial<IComment> = Object.assign(
      parent_comment,
      {
        children: new_parents_children,
      }
    );

    await CommentModel.findOneAndUpdate(
      { _id: parent_comment._id },
      updated_parent_comment
    );
  }

  await Promise.all([delete_children_promises, delete_comment_like_promises]);

  next();
});

commentSchema.plugin(mongoose_lean_virtuals);

export default commentSchema;
