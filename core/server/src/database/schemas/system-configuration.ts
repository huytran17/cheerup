import mongoose, { Model } from "mongoose";
import { get } from "lodash";
import mongoose_lean_virtuals from "mongoose-lean-virtuals";
import ISystemConfiguration from "../interfaces/system-configuration";

const Schema = mongoose.Schema;

const systemConfigurationSchema = new Schema<
  ISystemConfiguration,
  Model<ISystemConfiguration>
>(
  {
    is_blocked_comment: { type: Boolean, default: false },
    thumbnail: { type: Object },
    folder_icon: { type: Object },
    owner: {
      name: { type: String, default: "" },
      description: { type: String, default: "" },
      avatar: { type: Object },
    },
  },
  {
    toJSON: { virtuals: true },
  }
);

systemConfigurationSchema.index({ created_at: -1 });

systemConfigurationSchema.virtual("owner_avatar_url").get(function () {
  return get(this, "owner.avatar.location");
});

systemConfigurationSchema.virtual("thumbnail_url").get(function () {
  return get(this, "thumbnail.location");
});

systemConfigurationSchema.virtual("folder_icon_url").get(function () {
  return get(this, "folder_icon.location");
});

systemConfigurationSchema.plugin(mongoose_lean_virtuals);

export default systemConfigurationSchema;
