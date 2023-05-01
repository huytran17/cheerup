import handlebars from "handlebars";
import { pdfTemplate, template_data } from "./template";

export type IPdfContent = ({
  type,
  data,
}: {
  type: string;
  data: Record<string, unknown>;
}) => string;

export default function makePdfContent(): IPdfContent {
  return function pdfContent({
    type,
    data,
  }: {
    type: string;
    data: Record<string, unknown>;
  }): string {
    const exportTemplate = pdfTemplate[type];

    if (!exportTemplate) {
      throw new Error(`Invalid template type: ${type}`);
    }

    const final_template_data = Object.assign({}, data, template_data);

    const template = handlebars.compile(exportTemplate);
    return template(final_template_data);
  };
}
