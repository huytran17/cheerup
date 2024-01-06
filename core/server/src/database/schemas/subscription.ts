import mongoose, { Model } from "mongoose";
import mongoose_lean_virtuals from "mongoose-lean-virtuals";
import ISubscription from "../interfaces/subscription";

const Schema = mongoose.Schema;

const subscriptionSchema = new Schema<ISubscription, Model<ISubscription>>(
  {
    email: { type: String, trim: true, required: true },
    is_active: { type: Boolean, default: true },
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

subscriptionSchema.index({ created_at: -1 });

subscriptionSchema.plugin(mongoose_lean_virtuals);

export default subscriptionSchema;
