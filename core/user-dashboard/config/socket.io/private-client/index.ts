import { io, Socket } from "socket.io-client";
import { SOCKETIO_EMIT_EVENT, SOCKETIO_NSP } from "~/constants";

interface ServerToClientEvents {}

interface ClientToServerEvents {
  online: ({ user_id }: { user_id: string }) => void;
}

export default function initialPrivateSocketIO({
  user_id,
}: {
  user_id: string;
}) {
  try {
    if (!user_id) {
      return;
    }

    const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
      `${process.env.SERVER_URL}/${SOCKETIO_NSP.PRIVATE_CLIENT}`,
      {
        withCredentials: true,
      }
    );

    socket.emit(SOCKETIO_EMIT_EVENT.ONLINE, { user_id });
  } catch (error) {
    console.error(error);
  }
}
