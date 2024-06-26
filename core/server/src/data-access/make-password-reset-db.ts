import mongoose from "mongoose";
import PasswordReset from "../database/entities/password-reset";
import IPasswordReset from "../database/interfaces/password-reset";
import IPasswordResetDb from "./interfaces/password-reset-db";

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

      const exists = await passwordResetDbModel
        .findOne(query_conditions)
        .select("-__v")
        .lean({ virtuals: true });

      if (exists) {
        return new PasswordReset(exists);
      }

      return null;
    }

    async findByEmail({ email }: { email: string }): Promise<IPasswordReset> {
      const query_conditions = {
        email,
      };

      const exists = await passwordResetDbModel
        .findOne(query_conditions)
        .select("-__v")
        .lean({ virtuals: true });

      if (exists) {
        return new PasswordReset(exists);
      }

      return null;
    }

    async insert(payload: Partial<IPasswordReset>): Promise<IPasswordReset> {
      const created = await passwordResetDbModel.create(payload);

      if (created) {
        return new PasswordReset(created);
      }

      return null;
    }

    async hardDelete({ _id }: { _id: string }): Promise<IPasswordReset> {
      const exists = await passwordResetDbModel.findById({ _id });

      exists && (await exists.deleteOne());

      return null;
    }

    async findById({ _id }: { _id: string }): Promise<IPasswordReset> {
      const query_conditions = {
        _id,
      };

      const exists = await passwordResetDbModel
        .findOne(query_conditions)
        .select("-__v")
        .lean({ virtuals: true });

      if (exists) {
        return new PasswordReset(exists);
      }

      return null;
    }
  })();
}
