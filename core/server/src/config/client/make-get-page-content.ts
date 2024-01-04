import { HtmlToText } from "../html-to-text/make-html-to-text";

export type GetPageContent = ({ content }: { content: string }) => string;

export default function makeGetPageContent({
  htmlToText,
}: {
  htmlToText: HtmlToText;
}): GetPageContent {
  return function getPageContent({ content }) {
    return htmlToText({ html: content });
  };
}
