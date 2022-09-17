import _ from "lodash";
import mongoose from "mongoose";
import IEmailVerificationDb from "./interfaces/email-verification-db";
import EmailVerification from "../database/entities/email-verification";
import IEmailVerification from "../database/interfaces/email-verification";

export default function makeEmailVerificationDb({
  emailVerificationDbModel,
  moment,
}: {
  emailVerificationDbModel: mongoose.Model<
    IEmailVerification & mongoose.Document,
    Record<string, unknown>
  >;
  moment: any;
}): IEmailVerificationDb {
  return new (class MongooseEmailVerificationDb
    implements IEmailVerificationDb
  {
    /**
     * @description used by subscription dashboard
     * FIXME: Currently not in used. To be removed and should never be used.
     * @param param0
     * @returns
     */
    async findAll(): Promise<EmailVerification[] | null> {
      let query_conditions = Object.assign({});

      const existing = await emailVerificationDbModel
        .find(query_conditions)
        .lean({ virtuals: true });

      if (existing) {
        return existing.map(
          (subscription) => new EmailVerification(subscription)
        );
      }

      return null;
    }

    async findById({
      _id,
    }: {
      _id: string;
    }): Promise<EmailVerification | null> {
      const mongo_id_regex = new RegExp(/^[0-9a-fA-F]{24}$/i);
      const is_mongo_id = mongo_id_regex.test(_id);
      if (!is_mongo_id || !_id) {
        return null;
      }

      const query_conditions = {
        deleted_at: { $in: [null, undefined] },
      };

      if (_id) {
        query_conditions["_id"] = _id;
      }

      const existing = await emailVerificationDbModel
        .findOne(query_conditions)
        .lean({ virtuals: true });

      if (existing) {
        return new EmailVerification(existing);
      }
      return null;
    }

    async findByEmail({
      email,
    }: {
      email: string;
    }): Promise<EmailVerification | null> {
      const query_conditions = {
        deleted_at: { $in: [null, undefined] },
      };

      if (email) {
        query_conditions["email"] = email;
      }

      const existing = await emailVerificationDbModel
        .findOne(query_conditions)
        .lean({ virtuals: true });

      if (existing) {
        return new EmailVerification(existing);
      }
      return null;
    }

    async findByEmailAndVerificationCode({
      email,
      verification_code,
    }: {
      email: string;
      verification_code: string;
    }): Promise<EmailVerification | null> {
      const query_conditions = {
        deleted_at: { $in: [null, undefined] },
      };

      if (email) {
        query_conditions["email"] = email;
      }

      if (verification_code) {
        query_conditions["verification_code"] = verification_code;
      }

      const existing = await emailVerificationDbModel
        .findOne(query_conditions)
        .lean({ virtuals: true });

      if (existing) {
        return new EmailVerification(existing);
      }
      return null;
    }

    async insert(
      payload: Partial<IEmailVerification>
    ): Promise<EmailVerification | null> {
      const updated_payload = payload;

      const result = await emailVerificationDbModel.create([updated_payload]);
      const updated = await emailVerificationDbModel
        .findOne({ _id: result[0]?._id })
        .lean({ virtuals: true });

      if (updated) {
        return new EmailVerification(updated);
      }
      return null;
    }

    async delete({ _id }: { _id: string }): Promise<EmailVerification | null> {
      const existing = await emailVerificationDbModel.findOneAndUpdate(
        { _id },
        { deleted_at: new Date() }
      );
      const updated = await emailVerificationDbModel
        .findOne({ _id })
        .lean({ virtuals: true });
      if (updated) {
        return new EmailVerification(updated);
      }
      return null;
    }

    async hardDelete({
      _id,
    }: {
      _id: string;
    }): Promise<EmailVerification | null> {
      const existing = await emailVerificationDbModel.deleteOne({ _id: _id });
      const updated = await emailVerificationDbModel
        .findOne({ _id })
        .lean({ virtuals: true });
      if (updated) {
        return new EmailVerification(updated);
      }
      return null;
    }
  })();
}
