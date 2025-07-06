import { authenticator } from "otplib";

export default class TFA {
  private static tfa_instance: TFA;

  private constructor() {
    console.log("Two-factor authentication service initialized");
  }

  static getInstance(): TFA {
    if (!TFA.tfa_instance) {
      TFA.tfa_instance = new TFA();
    }

    return TFA.tfa_instance;
  }

  generateSecret(): string {
    return authenticator.generateSecret();
  }

  generateToken({
    email,
    service_name,
    secret,
  }: {
    email: string;
    service_name: string;
    secret: string;
  }): string {
    return authenticator.keyuri(email, service_name, secret);
  }

  verifyToken({ token, secret }: { token: string; secret: string }): boolean {
    return authenticator.verify({ token, secret });
  }
}

const tfa = TFA.getInstance();
export { tfa };
