import { convert } from "html-to-text";

export type HtmlToText = ({
  html,
  options,
}: {
  html: string;
  options?: object;
}) => string;

const default_options = {
  wordwrap: 130,
};

export default function makeHtmlToText(): HtmlToText {
  return function htmlToText({ html, options = {} }) {
    return convert(html, {
      ...default_options,
      ...options,
    });
  };
}
