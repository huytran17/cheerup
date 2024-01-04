import htmlToPdfNode from "html-pdf-node";

export type HtmlToPdf = ({
  content,
  options,
}: {
  content: string;
  options?: Record<string, unknown>;
}) => Promise<Buffer>;

export default function makeGetPdfContent(): HtmlToPdf {
  return async function getPdfContent({ content, options }) {
    return await htmlToPdfNode.generatePdf({ content }, options);
  };
}
