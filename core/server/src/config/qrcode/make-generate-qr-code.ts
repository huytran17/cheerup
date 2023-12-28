import qrcode from "qrcode";

export type IGenerateQRCode = ({
  otp_auth,
}: {
  otp_auth: string;
}) => Promise<string | null>;

export default function makeGenerateQRCode(): IGenerateQRCode {
  return async function generateQRCode({
    otp_auth,
  }: {
    otp_auth: string;
  }): Promise<string | null> {
    return await qrcode.toDataURL(otp_auth);
  };
}
