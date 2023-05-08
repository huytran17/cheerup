import handlebars from "handlebars";
import { templates, template_data } from "./templates";

export type IRenderPageContent = ({
  type,
  data,
}: {
  type: string;
  data?: Record<string, unknown>;
}) => string;

export default function makeRenderPageContent(): IRenderPageContent {
  return function renderPageContent({
    type,
    data,
  }: {
    type: string;
    data?: Record<string, unknown>;
  }): string {
    const page_template = templates[type];

    if (!page_template) {
      throw new Error(`Invalid template type: ${type}`);
    }

    const final_template_data = {
      ...template_data,
      data,
    };

    const template = handlebars.compile(page_template);
    return template(final_template_data);
  };
}
