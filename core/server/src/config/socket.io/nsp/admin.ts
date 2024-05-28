import { Namespace, Server } from "socket.io";
import { ServerEvents, SocketIONsp } from "../../../constants/socket.io";
import { verifyClient } from "../middlewares";

export type InitialAdminNsp = ({ io }: { io: Server }) => Namespace;

export interface IUserPayload {
  user_id: string;
}

interface ClientToServerEvents {}

interface ServerToClientEvents {
  [ServerEvents.ONLINE]: ({ user_id }: IUserPayload) => void;
  [ServerEvents.OFFLINE]: ({ user_id }: IUserPayload) => void;
}

export default function makeInitialAdminNsp(): InitialAdminNsp {
  return function initialAdminNsp({ io }) {
    const admin_nsp: Namespace<ClientToServerEvents, ServerToClientEvents> =
      io.of(SocketIONsp.PRIVATE_ADMIN);

    admin_nsp.use(verifyClient);

    return admin_nsp;
  };
}
