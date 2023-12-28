import mongoose, { Model } from "mongoose";
import mongoose_lean_virtuals from "mongoose-lean-virtuals";
import ISubscription from "../interfaces/subscription";

const Schema = mongoose.Schema;

const subscriptionSchema = new Schema<ISubscription, Model<ISubscription>>(
  {
    email: { type: String, trim: true, required: true },
    is_active: { type: Boolean, default: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    deleted_at: { type: Date, default: null },
  },
  {
    toJSON: { virtuals: true },
  }
);

subscriptionSchema.index({ created_at: -1 });

subscriptionSchema.plugin(mongoose_lean_virtuals);

export default subscriptionSchema;
