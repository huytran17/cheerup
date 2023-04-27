import htmlToPdfNode from "html-pdf-node";

export type IHtmlToPdf = ({
  content,
  options,
}: {
  content: string;
  options: Record<string, unknown>;
}) => void;

export default function makeHtmlToPdf(): IHtmlToPdf {
  return function htmlToPdf({
    content,
    options,
  }: {
    content: string;
    options: Record<string, unknown>;
  }) {
    return htmlToPdfNode.generatePdf(content, options);
  };
}
