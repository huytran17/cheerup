import ILoginFailedDb from "../../data-access/interfaces/login-failed-db";
import ILoginFailed from "../../database/interfaces/login-failed";

export interface IGetLoginFailedByAgentPayload {
  agent_id: string;
}

export type GetLoginFailedByAgent = ({
  agent_id,
}: IGetLoginFailedByAgentPayload) => Promise<ILoginFailed>;

export default function makeGetLoginFailedByAgent({
  loginFailedDb,
}: {
  loginFailedDb: ILoginFailedDb;
}): GetLoginFailedByAgent {
  return async function getLoginFailedByAgent({ agent_id }) {
    return await loginFailedDb.findByAgent({ agent_id });
  };
}
