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
    }): Promise<TwoFactorAuthentication> {
      const query_conditions = {
        code,
        type,
      };

      const existing = await twoFactorAuthenticationDbModel
        .findOne(query_conditions)
        .lean({ virtuals: true });

      if (existing) {
        return new TwoFactorAuthentication(existing);
      }
      return null;
    }

    async findByEmail({
      email,
      type,
    }: {
      email: string;
      type: string;
    }): Promise<TwoFactorAuthentication[]> {
      const query_conditions = {
        email,
        type,
      };

      const existing = await twoFactorAuthenticationDbModel
        .find(query_conditions)
        .lean({ virtuals: true });

      if (existing) {
        return map(existing, (tfa) => new TwoFactorAuthentication(tfa));
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
    }): Promise<TwoFactorAuthentication> {
      const query_conditions = {
        email,
        code,
        type,
      };

      const existing = await twoFactorAuthenticationDbModel
        .findOne(query_conditions)
        .lean({ virtuals: true });

      if (existing) {
        return new TwoFactorAuthentication(existing);
      }
      return null;
    }

    async insert(
      payload: Partial<ITwoFactorAuthentication>
    ): Promise<TwoFactorAuthentication> {
      const updated_payload = payload;

      const result = await twoFactorAuthenticationDbModel.create([
        updated_payload,
      ]);
      const updated = await twoFactorAuthenticationDbModel
        .findOne({ _id: result[0]?._id })
        .lean({ virtuals: true });

      if (updated) {
        return new TwoFactorAuthentication(updated);
      }
      return null;
    }

    async hardDelete({
      _id,
    }: {
      _id: string;
    }): Promise<TwoFactorAuthentication> {
      const existing = await twoFactorAuthenticationDbModel.findOne({ _id });
      await existing.deleteOne();

      const updated = await twoFactorAuthenticationDbModel
        .findOne({ _id })
        .lean({ virtuals: true });

      if (updated) {
        return new TwoFactorAuthentication(updated);
      }
      return null;
    }

    async findById({ _id }: { _id: string }): Promise<TwoFactorAuthentication> {
      const mongo_id_regex = new RegExp(/^[0-9a-fA-F]{24}$/i);
      const is_mongo_id = mongo_id_regex.test(_id);
      if (!is_mongo_id || !_id) {
        return null;
      }

      const query_conditions = {
        _id,
      };

      const existing = await twoFactorAuthenticationDbModel
        .findOne(query_conditions)
        .lean({ virtuals: true });

      if (existing) {
        return new TwoFactorAuthentication(existing);
      }

      return null;
    }
  })();
}
