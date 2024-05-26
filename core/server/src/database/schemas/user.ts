import mongoose, { Model } from "mongoose";
import { get, map } from "lodash";
import { CommentModel } from "../../data-access/models";
import mongoose_lean_virtuals from "mongoose-lean-virtuals";
import IUser from "../interfaces/user";

const Schema = mongoose.Schema;

const userSchema = new Schema<IUser, Model<IUser>>(
  {
    ip: { type: String, trim: true },
    hash_password: { type: String, trim: true },
    full_name: { type: String, trim: true },
    socialite: {
      provider: { type: String, trim: true },
    },
    is_blocked_comment: { type: Boolean, default: false },
    is_enabled_2fa: { type: Boolean, default: false },
    is_online: { type: Boolean, default: false },
    blocked_comment_at: { type: Date },
    avatar: { type: Object },
    email: { type: String, trim: true, lowercase: true, required: true },
    tfa_secret: { type: String, trim: true },
    deleted_at: { type: Date, default: null },
    last_online_at: { type: Date, default: null },
    login_failed_times: { type: Number, default: 0 },
    created_by: { type: Schema.Types.ObjectId, ref: "Admin" },
  },
  {
    toJSON: { virtuals: true },
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

userSchema.index({ created_at: -1, email: 1 });

userSchema.virtual("avatar_url").get(function () {
  return get(this, "avatar.path");
});

userSchema.pre("deleteOne", { document: true }, async function (next) {
  try {
    const user_id = get(this, "_id");
    if (!user_id) {
      return next();
    }

    const comments = (await CommentModel.find({ user: user_id })) || [];
    const delete_comment_promises = map(
      comments,
      async (comment) => comment && (await comment.deleteOne())
    );

    await Promise.all(delete_comment_promises);

    next();
  } catch (error) {
    throw new Error(error);
  }
});

userSchema.plugin(mongoose_lean_virtuals);

export default userSchema;
