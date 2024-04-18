import mongoose from "mongoose";
import mongooseLeanVirtuals from "mongoose-lean-virtuals";
import { AgentTypes } from "../interfaces/login-failed";

const Schema = mongoose.Schema;

const loginFailedSchema = new Schema(
  {
    agent: {
      type: Schema.Types.ObjectId,
      required: true,
      refPath: "agent_type",
    },
    agent_type: { type: String, required: true, enum: AgentTypes },
    failed_times: { type: Number, default: 0 },
  },
  {
    toJSON: { virtuals: true },
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

loginFailedSchema.index({ created_at: -1 });

loginFailedSchema.plugin(mongooseLeanVirtuals);

export default loginFailedSchema;
