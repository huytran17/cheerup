import { io, Socket } from "socket.io-client";
import {
  SOCKET_LISTEN_EVENT,
  SOCKETIO_EMIT_EVENT,
  SOCKETIO_NSP,
} from "~/constants";

interface IUserPayload {
  user_id: string;
}

interface ServerToClientEvents {
  [SOCKET_LISTEN_EVENT.ONLINE]: ({ user_id }: IUserPayload) => void;
  [SOCKET_LISTEN_EVENT.OFFLINE]: ({ user_id }: IUserPayload) => void;
}

interface ClientToServerEvents {
  [SOCKETIO_EMIT_EVENT.ONLINE]: ({ user_id }: IUserPayload) => void;
}

export default function initialPrivateSocketIO() {
  try {
    const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
      `${process.env.SERVER_URL}/${SOCKETIO_NSP.PRIVATE_ADMIN}`,
      {
        withCredentials: true,
      }
    );

    return socket;
  } catch (error) {
    console.error(error);
  }
}
