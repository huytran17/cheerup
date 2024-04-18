import IAdmin from "../interfaces/admin";
import ILoginFailed, { AgentTypes } from "../interfaces/login-failed";
import IUser from "../interfaces/user";

export default class LoginFailed implements ILoginFailed {
  public readonly _id: string;
  public readonly agent: IAdmin | IUser;
  public readonly agent_type: AgentTypes;
  public readonly failed_times: number;
  public readonly created_at: Date;
  public readonly updated_at: Date;

  constructor({
    _id,
    agent,
    agent_type,
    failed_times,
    created_at,
    updated_at,
  }: {
    _id: string;
    agent: IAdmin | IUser;
    agent_type: AgentTypes;
    failed_times: number;
    created_at: Date;
    updated_at: Date;
  }) {
    this._id = _id;
    this.agent = agent;
    this.agent_type = agent_type;
    this.failed_times = failed_times;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}
