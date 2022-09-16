import { convert } from "html-to-text";

const textToHtml = (text: string) => {
  return text;
};
const htmlToText = (html: string) => {
  return convert(html, {
    wordwrap: 130,
  });
};

export type ITextToHtml = (text: string) => string;
export type IHtmlToText = (text: string) => string;

export default Object.freeze({
  textToHtml,
  htmlToText,
});

export { textToHtml, htmlToText };
