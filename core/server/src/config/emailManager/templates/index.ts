import fs from "fs";
import defaultTemplateData from "./email-template-data";

const emailTextTemplate = {
  "get-email-verification-code": fs.readFileSync(
    `${__dirname}/get-email-verification-code.html`,
    "utf8"
  ),
  "new-post-notification": fs.readFileSync(
    `${__dirname}/new-post-notification.html`,
    "utf8"
  ),
};
const subjectTemplate = {
  "get-email-verification-code": `Verify your email!`,
  "new-post-notification": `New Post From {{product_name}}!`,
};

export default Object.freeze({
  emailTextTemplate,
  subjectTemplate,
  defaultTemplateData,
});

export { emailTextTemplate, subjectTemplate, defaultTemplateData };
