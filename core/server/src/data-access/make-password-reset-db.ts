import mongoose from "mongoose";
import IPasswordResetDb from "./interfaces/password-reset-db";
import PasswordReset from "../database/entities/password-reset";
import IPasswordReset from "../database/interfaces/password-reset";

export default function makePasswordResetDb({
  passwordResetDbModel,
}: {
  passwordResetDbModel: mongoose.Model<
    IPasswordReset & mongoose.Document,
    Record<string, unknown>
  >;
}): IPasswordResetDb {
  return new (class MongoosePasswordResetDb implements IPasswordResetDb {
    async findByCode({
      security_code,
    }: {
      security_code: string;
    }): Promise<IPasswordReset> {
      const query_conditions = {
        security_code,
      };

      const existing = await passwordResetDbModel
        .findOne(query_conditions)
        .lean({ virtuals: true });

      if (existing) {
        return new PasswordReset(existing);
      }
      return null;
    }

    async findByEmail({ email }: { email: string }): Promise<IPasswordReset> {
      const query_conditions = {
        email,
      };

      const existing = await passwordResetDbModel
        .findOne(query_conditions)
        .lean({ virtuals: true });

      if (existing) {
        return new PasswordReset(existing);
      }
      return null;
    }

    async insert(payload: Partial<IPasswordReset>): Promise<IPasswordReset> {
      const updated_payload = payload;

      const result = await passwordResetDbModel.create([updated_payload]);
      const updated = await passwordResetDbModel
        .findOne({ _id: result[0]?._id })
        .lean({ virtuals: true });

      if (updated) {
        return new PasswordReset(updated);
      }
      return null;
    }

    async hardDelete({ _id }: { _id: string }): Promise<IPasswordReset> {
      const existing = await passwordResetDbModel.findOne({ _id });
      await existing.deleteOne();

      const updated = await passwordResetDbModel
        .findOne({ _id })
        .lean({ virtuals: true });

      if (updated) {
        return new PasswordReset(updated);
      }
      return null;
    }

    async findById({ _id }: { _id: string }): Promise<IPasswordReset> {
      const mongo_id_regex = new RegExp(/^[0-9a-fA-F]{24}$/i);
      const is_mongo_id = mongo_id_regex.test(_id);
      if (!is_mongo_id || !_id) {
        return null;
      }

      const query_conditions = {
        _id,
      };

      const existing = await passwordResetDbModel
        .findOne(query_conditions)
        .lean({ virtuals: true });

      if (existing) {
        return new PasswordReset(existing);
      }

      return null;
    }
  })();
}
