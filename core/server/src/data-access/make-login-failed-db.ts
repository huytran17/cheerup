import mongoose from "mongoose";
import LoginFailed from "../database/entities/login-failed";
import ILoginFailed from "../database/interfaces/login-failed";
import ILoginFailedDb from "./interfaces/login-failed-db";

export default function makeLoginFailedDb({
  loginFailedDbModel,
}: {
  loginFailedDbModel: mongoose.Model<
    ILoginFailed & mongoose.Document,
    Record<string, unknown>
  >;
}): ILoginFailedDb {
  return new (class LoginFailedDb implements ILoginFailedDb {
    async findByAgent({
      agent_id,
    }: {
      agent_id: string;
    }): Promise<ILoginFailed> {
      const query_conditions = {
        agent: agent_id,
      };

      const exists = await loginFailedDbModel
        .findOne(query_conditions)
        .select("-__V")
        .lean({ virtuals: true });

      if (exists) {
        return new LoginFailed(exists);
      }

      return null;
    }

    async insert(payload: Partial<ILoginFailed>): Promise<ILoginFailed> {
      const created = await loginFailedDbModel.create(payload);

      if (created) {
        return new LoginFailed(created);
      }

      return null;
    }

    async update(payload: Partial<ILoginFailed>): Promise<ILoginFailed> {
      const updated = await loginFailedDbModel
        .findOneAndUpdate({ _id: payload._id }, payload, {
          returnDocument: "after",
        })
        .select("-__v")
        .lean({ virtuals: true });

      if (updated) {
        return new LoginFailed(updated);
      }

      return null;
    }

    async hardDelete({ _id }: { _id: string }): Promise<ILoginFailed> {
      const exists = await loginFailedDbModel.findById({ _id });

      exists && (await exists.deleteOne());

      return null;
    }
  })();
}
