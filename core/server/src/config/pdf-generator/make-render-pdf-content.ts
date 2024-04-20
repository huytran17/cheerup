import handlebars from "handlebars";
import { pdfTemplate, template_data } from "./template";

export type PdfContent = ({
  type,
  data,
}: {
  type: string;
  data: Record<string, unknown>;
}) => string;

export default function makeRenderPdfContent(): PdfContent {
  return function renderPdfContent({ type, data }) {
    const export_template = pdfTemplate[type];

    if (!export_template) {
      throw new Error(`Invalid template type: ${type}`);
    }

    const template = handlebars.compile(export_template);
    return template({ ...data, ...template_data });
  };
}
