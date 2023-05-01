import makeRenderPdf from "./make-render-pdf";
import makePdfContent from "./make-pdf-content";

const renderPdf = makeRenderPdf();

const pdfContent = makePdfContent();

export { renderPdf, pdfContent };
