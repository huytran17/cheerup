import { map } from "lodash";
import mongoose from "mongoose";
import ITwoFactorAuthenticationDb from "./interfaces/two-factor-authentication-db";
import TwoFactorAuthentication from "../database/entities/two-factor-authentication";
import ITwoFactorAuthentication from "../database/interfaces/two-factor-authentication";

export default function makeTwoFactorAuthenticationDb({
  twoFactorAuthenticationDbModel,
}: {
  twoFactorAuthenticationDbModel: mongoose.Model<
    ITwoFactorAuthentication & mongoose.Document,
    Record<string, unknown>
  >;
}): ITwoFactorAuthenticationDb {
  return new (class MongooseTwoFactorAuthenticationDb
    implements ITwoFactorAuthenticationDb
  {
    async findByCode({
      code,
      type,
    }: {
      code: string;
      type: string;
    }): Promise<ITwoFactorAuthentication> {
      const query_conditions = {
        code,
        type,
      };

      const exists = await twoFactorAuthenticationDbModel
        .findOne(query_conditions)
        .select("-__v")
        .lean({ virtuals: true });

      if (exists) {
        return new TwoFactorAuthentication(exists);
      }

      return null;
    }

    async findByEmail({
      email,
      type,
    }: {
      email: string;
      type: string;
    }): Promise<ITwoFactorAuthentication[]> {
      const query_conditions = {
        email,
        type,
      };

      const exists = await twoFactorAuthenticationDbModel
        .find(query_conditions)
        .select("-__v")
        .lean({ virtuals: true });

      if (exists) {
        return map(exists, (tfa) => new TwoFactorAuthentication(tfa));
      }

      return null;
    }

    async findByEmailAndCode({
      email,
      code,
      type,
    }: {
      email: string;
      code: string;
      type: string;
    }): Promise<ITwoFactorAuthentication> {
      const query_conditions = {
        email,
        code,
        type,
      };

      const exists = await twoFactorAuthenticationDbModel
        .findOne(query_conditions)
        .select("-__v")
        .lean({ virtuals: true });

      if (exists) {
        return new TwoFactorAuthentication(exists);
      }

      return null;
    }

    async insert(
      payload: Partial<ITwoFactorAuthentication>
    ): Promise<ITwoFactorAuthentication> {
      const created = await twoFactorAuthenticationDbModel.create(payload);

      if (created) {
        return new TwoFactorAuthentication(created);
      }

      return null;
    }

    async hardDelete({
      _id,
    }: {
      _id: string;
    }): Promise<ITwoFactorAuthentication> {
      const exists = await twoFactorAuthenticationDbModel.findById({ _id });

      exists && (await exists.deleteOne());

      return null;
    }

    async findById({
      _id,
    }: {
      _id: string;
    }): Promise<ITwoFactorAuthentication> {
      const exists = await twoFactorAuthenticationDbModel
        .findById({ _id })
        .select("-__v")
        .lean({ virtuals: true });

      if (exists) {
        return new TwoFactorAuthentication(exists);
      }

      return null;
    }
  })();
}
