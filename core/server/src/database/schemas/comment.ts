import mongoose from "mongoose";
import mongoose_lean_virtuals from "mongoose-lean-virtuals";
import { get, map, filter, merge } from "lodash";
import { isEmpty } from "../../utils/is-empty";
import { CommentLikeModel, CommentModel } from "../../data-access/models";
import IComment from "../interfaces/comment";

const Schema = mongoose.Schema;

const commentSchema = new Schema({
  content: { type: String, trim: true, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
  parent: { type: Schema.Types.ObjectId, ref: "Comment" },
  children: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

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
        _id: comment.toString(),
      });

      return await comment_document?.deleteOne();
    }
  );

  const comment_likes = await CommentLikeModel.find({
    comment: get(this, "_id"),
  }) || [];

  const delete_comment_like_promises = map(
    comment_likes,
    async (comment_like) => comment_like && (await comment_like.deleteOne())
  );

  const is_child = !!this.parent;
  if (is_child) {
    const parent_comment = await CommentModel.findOne({
      _id: this.parent.toString(),
    });

    const parents_children: IComment[] = get(parent_comment, "children", []);
    const new_parents_children: IComment[] = filter(
      parents_children,
      (comment_id) => comment_id.toString() !== this._id.toString()
    );

    const updated_parent_comment: Partial<IComment> = merge(
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
