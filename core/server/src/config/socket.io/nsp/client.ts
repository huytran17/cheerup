import { Namespace, Server } from "socket.io";
import { ClientEvents, SocketIONsp } from "../../../constants/socket.io";
import { verifyClient } from "../middlewares";

export type InitialClientNsp = ({ io }: { io: Server }) => Namespace;

export interface IUserPayload {
  user_id: string;
}

interface ClientToServerEvents {
  [ClientEvents.ONLINE]: ({ user_id }: IUserPayload) => void;
}

interface ServerToClientEvents {}

export default function makeInitialClientNsp(): InitialClientNsp {
  return function initialClientNsp({ io }) {
    const client_nsp: Namespace<ClientToServerEvents, ServerToClientEvents> =
      io.of(SocketIONsp.PRIVATE_CLIENT);

    client_nsp.use(verifyClient);

    return client_nsp;
  };
}
