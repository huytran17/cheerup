import makeGenerateQRCode from "./make-generate-qr-code";

const generateQRCode = makeGenerateQRCode();

const qrCodeServices = Object.freeze({
  generateQRCode,
});

export default qrCodeServices;

export { generateQRCode };
