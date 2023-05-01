import htmlToPdfNode from "html-pdf-node";

export type IHtmlToPdf = ({
  content,
  options,
}: {
  content: string;
  options?: Record<string, unknown>;
}) => Promise<Buffer>;

export default function makeRenderPdf(): IHtmlToPdf {
  return async function renderPdf({
    content,
    options,
  }: {
    content: string;
    options?: Record<string, unknown>;
  }): Promise<any> {
    return await htmlToPdfNode.generatePdf({ content }, options);
  };
}
