import mongoose, { Model } from "mongoose";
import mongoose_lean_virtuals from "mongoose-lean-virtuals";
import ICategory from "../interfaces/category";
import { CategoryModel, PostModel } from "../../data-access/models";
import { get, map } from "lodash";
import { textToSlug } from "../../config/text-to-slug";
import { isEmpty } from "../../utils/is-empty";

const Schema = mongoose.Schema;

const categorySchema = new Schema<ICategory, Model<ICategory>>(
  {
    title: { type: String, trim: true },
    slug: { type: String, trim: true },
    badge_color: { type: String, trim: true, default: "#FF2E55" },
    description: { type: String, trim: true },
    created_by: { type: Schema.Types.ObjectId, ref: "Admin" },
    thumbnail: { type: Object },
    seo: { type: Object },
    deleted_at: { type: Date, default: null },
  },
  {
    toJSON: { virtuals: true },
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

categorySchema.index({ created_at: -1, title: -1 });

categorySchema.virtual("thumbnail_url").get(function () {
  return get(this, "thumbnail.path");
});

categorySchema.pre("findOneAndUpdate", async function (next) {
  try {
    const update_details = <ICategory>this.getUpdate();

    const title = get(update_details, "title", "");
    if (!title) {
      return next();
    }

    let slug = textToSlug({ text: title });

    const slug_existed = await CategoryModel.findOne({
      _id: { $ne: update_details._id },
      slug,
    });

    !isEmpty(slug_existed) && (slug = `${slug}-${Date.now()}`);

    update_details.slug = slug;

    next();
  } catch (error) {
    throw new Error(error);
  }
});

categorySchema.pre("save", async function (next) {
  try {
    const title = get(this, "title");
    if (!title) {
      return next();
    }

    let slug = textToSlug({ text: title });

    const slug_existed = await CategoryModel.findOne({
      _id: { $ne: this._id },
      slug,
    });

    !isEmpty(slug_existed) && (slug = `${slug}-${Date.now()}`);

    this.slug = slug;

    next();
  } catch (error) {
    throw new Error(error);
  }
});

categorySchema.pre("deleteOne", { document: true }, async function (next) {
  try {
    const category_id = get(this, "_id");
    if (!category_id) {
      return next();
    }

    const posts = (await PostModel.find({ categories: category_id })) || [];
    const delete_post_promises = map(
      posts,
      async (post) => post && (await post.deleteOne())
    );

    await Promise.all(delete_post_promises);

    next();
  } catch (error) {
    throw new Error(error);
  }
});

categorySchema.plugin(mongoose_lean_virtuals);

export default categorySchema;
