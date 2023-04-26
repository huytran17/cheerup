import htmlToPdfNode from "html-pdf-node";

export default function makeHtmlToPdf(): void {
  return function htmlToPdf({
    content,
    options,
  }: {
    content: string;
    options: Record<string, unknown>;
  }): void {
    return htmlToPdfNode.generatePdf(content, options);
  };
}
