import IAdmin from "./admin";
import IUser from "./user";

export default interface ILoginFailed {
  _id: string;
  agent: IUser | IAdmin;
  agent_type: AgentTypes;
  failed_times: number;
  created_at: Date;
  updated_at: Date;
}

export enum AgentTypes {
  ADMIN = "Admin",
  USER = "User",
}
