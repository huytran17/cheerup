import { merge } from "lodash";
import handlebars from "handlebars";
import { pdfTemplate, template_data } from "./template";

export type IPdfContent = ({
  type,
  data,
}: {
  type: string;
  data: Record<string, unknown>;
}) => string;

export default function makeRenderPdfContent(): IPdfContent {
  return function renderPdfContent({
    type,
    data,
  }: {
    type: string;
    data: Record<string, unknown>;
  }): string {
    const export_template = pdfTemplate[type];

    if (!export_template) {
      throw new Error(`Invalid template type: ${type}`);
    }

    const final_template_data = merge({}, data, template_data);

    const template = handlebars.compile(export_template);
    return template(final_template_data);
  };
}
