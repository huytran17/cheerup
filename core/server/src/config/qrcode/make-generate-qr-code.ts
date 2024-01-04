import qrcode from "qrcode";

export type GenerateQRCode = ({
  otp_auth,
}: {
  otp_auth: string;
}) => Promise<string>;

export default function makeGenerateQRCode(): GenerateQRCode {
  return async function generateQRCode({ otp_auth }) {
    return await qrcode.toDataURL(otp_auth);
  };
}
