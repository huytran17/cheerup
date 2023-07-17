import qrcode from "qrcode";

export type IGenerateQRCode = ({
  otpAuth,
}: {
  otpAuth: string;
}) => Promise<string | null>;

export default function makeGenerateQRCode(): IGenerateQRCode {
  return async function generateQRCode({
    otpAuth,
  }: {
    otpAuth: string;
  }): Promise<string | null> {
    const QRCodeImageUrl = await qrcode.toDataURL(otpAuth);
    return QRCodeImageUrl;
  };
}
