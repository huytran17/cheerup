import mongoose from "mongoose";
import _ from "lodash";

const Schema = mongoose.Schema;

const systemConfigurationSchema = new Schema(
  {
    is_block_comment: { type: Boolean, default: false },
    is_maintaining: { type: Boolean, default: false },
    client_meta: {
      title: { type: String, default: "" },
      description: { type: String, default: "" },
      author: { type: String, default: "" },
      keywords: [{ type: String, default: "" }],
      logo: { type: Object },
      favicon: { type: Object },
    },
    admin_meta: {
      title: { type: String, default: "" },
      description: { type: String, default: "" },
      author: { type: String, default: "" },
      logo: { type: Object },
      favicon: { type: Object },
    },
  },
  {
    toJSON: { virtuals: true },
  }
);

systemConfigurationSchema.virtual("admin_logo_url").get(function () {
  return _.get(this, "admin_meta.logo.meta.location");
});

systemConfigurationSchema.virtual("admin_favicon_url").get(function () {
  return _.get(this, "admin_meta.favicon.meta.location");
});

systemConfigurationSchema.virtual("client_logo_url").get(function () {
  return _.get(this, "client_meta.logo.meta.location");
});

systemConfigurationSchema.virtual("client_logo_url").get(function () {
  return _.get(this, "client_meta.favicon.meta.location");
});

export default systemConfigurationSchema;
