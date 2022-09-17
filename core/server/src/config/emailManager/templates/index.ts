import fs from "fs";
import defaultTemplateData from "./email-template-data";

const emailTextTemplate = {
  "get-email-verification-code": fs.readFileSync(
    `${__dirname}/get-email-verification-code.html`,
    "utf8"
  ),
};
const subjectTemplate = {
  "get-email-verification-code": `Someone replied to your comment!`,
};

export default Object.freeze({
  emailTextTemplate,
  subjectTemplate,
  defaultTemplateData,
});

export { emailTextTemplate, subjectTemplate, defaultTemplateData };
