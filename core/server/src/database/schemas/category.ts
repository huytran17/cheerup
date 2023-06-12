import mongoose from "mongoose";
import mongoose_lean_virtuals from "mongoose-lean-virtuals";
import ICategory from "../interfaces/category";
import { CategoryModel, PostModel } from "../../data-access/models";
import { get, map } from "lodash";
import { textToSlug } from "../../utils/text-to-slug";
import { isEmpty } from "../../utils/is-empty";

const Schema = mongoose.Schema;

const categorySchema = new Schema(
  {
    title: { type: String, trim: true },
    slug: { type: String, trim: true },
    badge_color: { type: String, trim: true, default: "#FF2E55" },
    description: { type: String, trim: true },
    created_by: { type: Schema.Types.ObjectId, ref: "Admin" },
    thumbnail: { type: Object },
    seo: { type: Object },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    deleted_at: { type: Date, default: null },
  },
  {
    toJSON: { virtuals: true },
  }
);

categorySchema.index({ created_at: -1 });

categorySchema.virtual("thumbnail_url").get(function () {
  return get(this, "thumbnail.location");
});

categorySchema.pre("findOneAndUpdate", async function (next) {
  const update_details = <ICategory>this.getUpdate();

  const title = get(update_details, "title", "");
  let slug = textToSlug({ text: title });

  const slug_existed = await CategoryModel.findOne({
    _id: { $ne: update_details._id },
    slug,
  });

  !isEmpty(slug_existed) && (slug = `${slug}-${Date.now()}`);

  update_details.slug = slug;

  next();
});

categorySchema.pre("save", async function (next) {
  const title = get(this, "title");
  let slug = textToSlug({ text: title });

  const slug_existed = await CategoryModel.findOne({
    _id: { $ne: this._id },
    slug,
  });

  !isEmpty(slug_existed) && (slug = `${slug}-${Date.now()}`);

  this.slug = slug;

  next();
});

categorySchema.pre('deleteOne', { document: true }, async function (next) {
  const category_id = get(this, "_id")
  const posts = await PostModel.find({ categories: category_id }) || []
  const delete_post_promises = map(posts, async post => post && await post.deleteOne())

  await Promise.all(delete_post_promises)

  next()
})

categorySchema.plugin(mongoose_lean_virtuals);

export default categorySchema;
