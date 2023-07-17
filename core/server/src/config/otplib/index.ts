import { authenticator } from "otplib";

export default class OTPLib {
  public static otp_instance: OTPLib;

  constructor() {
    if (OTPLib.otp_instance) {
      return OTPLib.otp_instance;
    }

    OTPLib.otp_instance = this;
  }

  getInstance(): OTPLib {
    if (OTPLib.otp_instance) {
      return OTPLib.otp_instance;
    }

    new OTPLib();
    return OTPLib.otp_instance;
  }

  generateScret(): string {
    return authenticator.generateSecret();
  }

  generateOTPToken({
    username,
    service_name,
    secret,
  }: {
    username: string;
    service_name: string;
    secret: string;
  }): string {
    return authenticator.keyuri(username, service_name, secret);
  }

  verifyOTPToken({
    token,
    secret,
  }: {
    token: string;
    secret: string;
  }): boolean {
    return authenticator.verify({ token, secret });
  }
}

const otp_lib = new OTPLib();
export { otp_lib };
