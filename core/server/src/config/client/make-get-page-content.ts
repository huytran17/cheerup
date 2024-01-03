import { HtmlToText } from "../html-to-text/make-html-to-text";

export type IGetPageContent = ({ content }: { content: string }) => string;

export default function makeGetPageContent({
  htmlToText,
}: {
  htmlToText: HtmlToText;
}): IGetPageContent {
  return function getPageContent({ content }: { content: string }): string {
    return htmlToText({ html: content });
  };
}
