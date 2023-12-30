import mongoose from "mongoose";
import ISystemConfigurationDb from "./interfaces/system-configuration-db";
import SystemConfiguration from "../database/entities/system-configuration";
import ISystemConfiguration from "../database/interfaces/system-configuration";

export default function makeSystemConfigurationDb({
  systemConfigurationDbModel,
  moment,
}: {
  systemConfigurationDbModel: mongoose.Model<
    ISystemConfiguration & mongoose.Document,
    Record<string, unknown>
  >;
  moment: any;
}): ISystemConfigurationDb {
  return new (class MongooseSystemConfigurationDb
    implements ISystemConfigurationDb
  {
    async findOne(): Promise<SystemConfiguration> {
      const existing = await systemConfigurationDbModel
        .findOne()
        .lean({ virtuals: true });

      if (existing) {
        return new SystemConfiguration(existing);
      }

      return null;
    }

    async insert(
      payload: Partial<ISystemConfiguration>
    ): Promise<SystemConfiguration> {
      const updated_payload = payload;

      const result = await systemConfigurationDbModel.create([updated_payload]);
      const updated = await systemConfigurationDbModel
        .findOne({ _id: result[0]?._id })
        .lean({ virtuals: true });

      if (updated) {
        return new SystemConfiguration(updated);
      }

      return null;
    }

    async findById({ _id }: { _id: string }): Promise<SystemConfiguration> {
      const mongo_id_regex = new RegExp(/^[0-9a-fA-F]{24}$/i);
      const is_mongo_id = mongo_id_regex.test(_id);
      if (!is_mongo_id || !_id) {
        return null;
      }

      const existing = await systemConfigurationDbModel
        .findById(_id)
        .lean({ virtuals: true });

      if (existing) {
        return new SystemConfiguration(existing);
      }

      return null;
    }

    async update(
      payload: Partial<ISystemConfiguration>
    ): Promise<SystemConfiguration> {
      const result = await systemConfigurationDbModel
        .findOneAndUpdate({ _id: payload._id }, payload)
        .lean({ virtuals: true });

      const updated = await systemConfigurationDbModel
        .findOne({ _id: result?._id })
        .lean({ virtuals: true });

      if (updated) {
        return new SystemConfiguration(updated);
      }

      return null;
    }
  })();
}
