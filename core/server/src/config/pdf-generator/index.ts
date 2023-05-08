import makeGetPdfContent from "./make-get-pdf-content";
import makeRenderPdfContent from "./make-render-pdf-content";

const getPdfContent = makeGetPdfContent();

const renderPdfContent = makeRenderPdfContent();

export { getPdfContent, renderPdfContent };
