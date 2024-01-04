import { merge } from "lodash";
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

    const final_template_data = merge({}, data, template_data);

    const template = handlebars.compile(export_template);
    return template(final_template_data);
  };
}
