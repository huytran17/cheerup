import mongoose, { Model } from "mongoose";
import mongoose_lean_virtuals from "mongoose-lean-virtuals";
import IPost from "../interfaces/post";
import { get, map } from "lodash";
import { PostModel, CommentModel } from "../../data-access/models";
import { textToSlug } from "../../config/text-to-slug";
import { isEmpty } from "../../utils/is-empty";

const Schema = mongoose.Schema;

const postSchema = new Schema<IPost, Model<IPost>>(
  {
    title: { type: String, trim: true },
    slug: { type: String, trim: true },
    description: { type: String, trim: true },
    is_blocked_comment: { type: Boolean, default: false },
    is_notified_to_user: { type: Boolean, default: false },
    thumbnail: { type: Object },
    seo: { type: Object },
    content: { type: String, trim: true },
    source: { type: String, trim: true },
    tags: [{ type: String, trim: true, default: [] }],
    author: { type: Schema.Types.ObjectId, ref: "Admin" },
    categories: [{ type: Schema.Types.ObjectId, ref: "Category" }],
    views: { type: Number, default: 0 },
    created_at: { type: Date, default: Date.now },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

postSchema.index({ created_at: -1, views: 1, slug: 1 });

postSchema.virtual("thumbnail_url").get(function () {
  return get(this, "thumbnail.location");
});

postSchema.pre("findOneAndUpdate", async function (next) {
  const update_details = <IPost>this.getUpdate();

  const title = get(update_details, "title", "");
  let slug = textToSlug({ text: title });

  const slug_existed = await PostModel.findOne({
    _id: { $ne: update_details._id },
    slug,
  });

  !isEmpty(slug_existed) && (slug = `${slug}-${Date.now()}`);

  update_details.slug = slug;

  next();
});

postSchema.pre("save", async function (next) {
  const title = get(this, "title");
  let slug = textToSlug({ text: title });

  const slug_existed = await PostModel.findOne({
    _id: { $ne: this._id },
    slug,
  });

  !isEmpty(slug_existed) && (slug = `${slug}-${Date.now()}`);

  this.slug = slug;

  next();
});

postSchema.pre("findOneAndDelete", { document: true }, async function (next) {
  const post_id = get(this, "_id");
  const comments = (await CommentModel.find({ post: post_id })) || [];
  const delete_comment_promises = map(
    comments,
    async (comment) => comment && (await comment.deleteOne())
  );
  await Promise.all(delete_comment_promises);

  next();
});

postSchema.plugin(mongoose_lean_virtuals);

export default postSchema;
