import handlebars from "handlebars";
import { merge } from "lodash";
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

    const final_template_data = merge({}, template_data, data);

    const template = handlebars.compile(page_template);

    return template(final_template_data);
  };
}
