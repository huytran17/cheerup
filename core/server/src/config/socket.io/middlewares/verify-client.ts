import { NextFunction } from "express";
import { Socket } from "socket.io";
import { VerifyAccessToken } from "../../access-token-manager/verify-access-token";

export default function makeVerifyClient({
  verifyAccessToken,
}: {
  verifyAccessToken: VerifyAccessToken;
}) {
  return async function verifyClient(socket: Socket, next: NextFunction) {
    try {
      const cookies = socket.handshake?.headers?.cookie?.split(";") || [];
      const access_token = cookies
        .filter((cookie) => cookie.includes("access_token"))
        ?.join()
        ?.replace("access_token=", "");

      verifyAccessToken(access_token.trim());

      next();
    } catch (error) {
      console.error(error);
      next(new Error(error));
    }
  };
}
