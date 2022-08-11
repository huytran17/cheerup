import _ from "lodash";
import mongoose from "mongoose";
import ISystemConfigurationDb from "./interfaces/system-configuration-db";
import SystemConfiguration from "../database/entities/system-configuration";
import ISystemConfiguration from "../database/interfaces/system-configuration";

export default function makeSystemConfigurationDb({
  systemConfigurationModel,
  moment,
}: {
  systemConfigurationModel: mongoose.Model<
    ISystemConfiguration & mongoose.Document,
    Record<string, unknown>
  >;
  moment: any;
}): ISystemConfigurationDb {
  return new (class MongooseSystemConfigurationDb
    implements ISystemConfigurationDb
  {
    async findById({
      _id,
    }: {
      _id: string;
    }): Promise<SystemConfiguration | null> {
      const mongo_id_regex = new RegExp(/^[0-9a-fA-F]{24}$/i);
      const is_mongo_id = mongo_id_regex.test(_id);
      if (!is_mongo_id || !_id) {
        return null;
      }

      const existing = await systemConfigurationModel
        .findById(_id)
        .populate("author", "-_v")
        .populate("category", "-_v")
        .lean({ virtuals: true });

      if (existing) {
        return new SystemConfiguration(existing);
      }
      return null;
    }

    async update(
      payload: Partial<ISystemConfiguration>
    ): Promise<SystemConfiguration | null> {
      const result = await systemConfigurationModel
        .findOneAndUpdate({ _id: payload._id }, payload)
        .populate("author", "-_v")
        .populate("category", "-_v")
        .lean({ virtuals: true });

      const updated = await systemConfigurationModel
        .findOne({ _id: result?._id })
        .lean({ virtuals: true });

      if (updated) {
        return new SystemConfiguration(updated);
      }

      return null;
    }
  })();
}
