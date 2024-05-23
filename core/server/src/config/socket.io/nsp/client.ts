import { Namespace, Server } from "socket.io";
import { SocketEvents, SocketIONsp } from "../../../constants/socket.io";
import IUserDb from "../../../data-access/interfaces/user-db";

interface IUserPayload {
  user_id: string;
}

interface ClientToServerEvents {
  online: ({ user_id }: IUserPayload) => void;
}

interface ServerToClientEvents {
  offline: ({ user_id }: IUserPayload) => void;
}

export default function makeInitialClientNsp({ userDb }: { userDb: IUserDb }) {
  return function initialClientNsp(io: Server) {
    const online_users = {};

    const client_nsp: Namespace<ClientToServerEvents, ServerToClientEvents> =
      io.of(SocketIONsp.CLIENT);

    client_nsp.on(SocketEvents.CONNECT, (socket) => {
      socket.on(
        "online",
        ({ user_id }: IUserPayload) => (online_users[socket.id] = user_id)
      );

      socket.on(SocketEvents.DISCONNECT, async () => {
        const offline_user_id = online_users[socket.id]?.toString();

        delete online_users[socket.id];

        const user_ids = Array.from(new Set(Object.values(online_users)));

        const is_user_still_online = user_ids.includes(offline_user_id);
        if (is_user_still_online) {
          return;
        }

        client_nsp.emit("offline", { user_id: offline_user_id });

        await userDb.update({
          _id: offline_user_id,
          last_online_at: new Date(),
        });
      });
    });
  };
}
