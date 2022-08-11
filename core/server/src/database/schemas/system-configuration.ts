import mongoose from "mongoose";

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

export default systemConfigurationSchema;
