import htmlToPdfNode from "html-pdf-node";

export type IHtmlToPdf = ({
  content,
  options,
}: {
  content: string;
  options?: Record<string, unknown>;
}) => Promise<Buffer>;

export default function makeGetPdfContent(): IHtmlToPdf {
  return async function getPdfContent({
    content,
    options,
  }: {
    content: string;
    options?: Record<string, unknown>;
  }): Promise<any> {
    return await htmlToPdfNode.generatePdf({ content }, options);
  };
}
