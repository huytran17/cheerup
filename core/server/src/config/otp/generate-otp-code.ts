import otp from "otp-generator";

export interface IGenerateOtpCodeData {
  length: number;
  options?: Record<string, boolean>;
}

export type IGenerateOtpCode = ({
  length,
  options,
}: IGenerateOtpCodeData) => string;

export default function makeGenerateOtpCode(): IGenerateOtpCode {
  return function generateOtpCode({
    length,
    options,
  }: IGenerateOtpCodeData): string {
    const otp_code = otp.generate(length, { ...options });
    return otp_code;
  };
}
