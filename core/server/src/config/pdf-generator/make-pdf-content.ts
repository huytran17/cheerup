import handlebars from "handlebars";
import { pdfTemplate, template_data } from "./template";

export type IPdfContent = () => string;

export default function makePdfContent() {
  return function pdfContent({
    type,
    data,
  }: {
    type: string;
    data: Record<string, unknown>;
  }) {
    const exportTemplate = pdfTemplate[type];

    if (!exportTemplate) {
      throw new Error(`Invalid template type: ${type}`);
    }

    const final_template_data = Object.assign({}, data, template_data);

    const template = handlebars.compile(exportTemplate);
    return template(final_template_data);
  };
}
