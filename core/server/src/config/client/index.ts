import { htmlToText } from "../html-to-text";

import makeGetPageContent from "./make-get-page-content";
import makeRenderPageContent from "./make-render-page-content";

const getPageContent = makeGetPageContent({ htmlToText });
const renderPageContent = makeRenderPageContent();

export default Object.freeze({
  renderPageContent,
  getPageContent,
});

export { getPageContent, renderPageContent };
