import { IHtmlToText } from "../../utils/html-to-text";

export type IGetPageContent = ({ content }: { content: string }) => string;

export default function makeGetPageContent({
  htmlToText,
}: {
  htmlToText: IHtmlToText;
}): IGetPageContent {
  return function getPageContent({ content }: { content: string }): string {
    return htmlToText(content);
  };
}
