import _ from "lodash";
import mongoose from "mongoose";
import ITwoFactorAuthenticationDb from "./interfaces/two-factor-authentication-db";
import TwoFactorAuthentication from "../database/entities/two-factor-authentication";
import ITwoFactorAuthentication from "../database/interfaces/two-factor-authentication";

export default function makeTwoFactorAuthenticationDb({
  twoFactorAuthenticationDbModel,
  moment,
}: {
  twoFactorAuthenticationDbModel: mongoose.Model<
    ITwoFactorAuthentication & mongoose.Document,
    Record<string, unknown>
  >;
  moment: any;
}): ITwoFactorAuthenticationDb {
  return new (class MongooseTwoFactorAuthenticationDb
    implements ITwoFactorAuthenticationDb
  {
    async findByCode({
      code,
    }: {
      code: string;
    }): Promise<TwoFactorAuthentication | null> {
      const query_conditions = {
        code,
      };

      const existing = await twoFactorAuthenticationDbModel
        .findOne(query_conditions)
        .lean({ virtuals: true });

      if (existing) {
        return new TwoFactorAuthentication(existing);
      }
      return null;
    }

    async findByEmailAndCode({
      email,
      code,
    }: {
      email: string;
      code: string;
    }): Promise<TwoFactorAuthentication | null> {
      const query_conditions = {
        email,
        code,
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
    ): Promise<TwoFactorAuthentication | null> {
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
    }): Promise<TwoFactorAuthentication | null> {
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

    async findById({
      _id,
    }: {
      _id: string;
    }): Promise<TwoFactorAuthentication | null> {
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
