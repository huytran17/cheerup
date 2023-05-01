import fs from "fs";
import template_data from "./tempalte-data";

const pdfTemplate = {
  post: fs.readFileSync(`${__dirname}/post.html`, "utf8"),
};

export default Object.freeze({
  pdfTemplate,
  template_data,
});

export { pdfTemplate, template_data };
