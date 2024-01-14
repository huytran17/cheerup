import mongoose from "mongoose";
import ISystemConfigurationDb from "./interfaces/system-configuration-db";
import SystemConfiguration from "../database/entities/system-configuration";
import ISystemConfiguration from "../database/interfaces/system-configuration";

export default function makeSystemConfigurationDb({
  systemConfigurationDbModel,
}: {
  systemConfigurationDbModel: mongoose.Model<
    ISystemConfiguration & mongoose.Document,
    Record<string, unknown>
  >;
}): ISystemConfigurationDb {
  return new (class MongooseSystemConfigurationDb
    implements ISystemConfigurationDb
  {
    async findOne(): Promise<ISystemConfiguration> {
      const exists = await systemConfigurationDbModel
        .findOne()
        .select("-__v")
        .lean({ virtuals: true });

      if (exists) {
        return new SystemConfiguration(exists);
      }

      return null;
    }

    async insert(
      payload: Partial<ISystemConfiguration>
    ): Promise<ISystemConfiguration> {
      const created = await systemConfigurationDbModel.create(payload);

      if (created) {
        return new SystemConfiguration(created);
      }

      return null;
    }

    async findById({ _id }: { _id: string }): Promise<ISystemConfiguration> {
      const exists = await systemConfigurationDbModel
        .findById(_id)
        .select("-__v")
        .lean({ virtuals: true });

      if (exists) {
        return new SystemConfiguration(exists);
      }

      return null;
    }

    async update(
      payload: Partial<ISystemConfiguration>
    ): Promise<ISystemConfiguration> {
      const updated = await systemConfigurationDbModel
        .findOneAndUpdate({ _id: payload._id }, payload)
        .select("-__v")
        .lean({ virtuals: true });

      if (updated) {
        return new SystemConfiguration(updated);
      }

      return null;
    }
  })();
}
