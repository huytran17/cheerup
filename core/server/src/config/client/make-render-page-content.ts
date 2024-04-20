import handlebars from "handlebars";
import { templates, template_data } from "./templates";

export type RenderPageContent = ({
  type,
  data,
}: {
  type: string;
  data?: Record<string, unknown>;
}) => string;

export default function makeRenderPageContent(): RenderPageContent {
  return function renderPageContent({ type, data }) {
    const page_template = templates[type];

    if (!page_template) {
      throw new Error(`Invalid template type: ${type}`);
    }

    const template = handlebars.compile(page_template);

    return template({ ...template_data, ...data });
  };
}
