import { convert } from "html-to-text";

export type IHtmlToText = (text: string) => string;

const htmlToText = (html: string) => {
  return convert(html, {
    wordwrap: 130,
  });
};

export default Object.freeze({
  htmlToText,
});

export { htmlToText };
