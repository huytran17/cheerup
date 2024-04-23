import fs from "fs";
import defaultTemplateData from "./email-template-data";

const emailTextTemplate = {
  "forget-password-verification-code": fs.readFileSync(
    `${__dirname}/forget-password-verification-code.html`,
    "utf8"
  ),
  "new-post-notification": fs.readFileSync(
    `${__dirname}/new-post-notification.html`,
    "utf8"
  ),
  "enable-2fa-confirmation": fs.readFileSync(
    `${__dirname}/enable-2fa-confirmation.html`,
    "utf8"
  ),
  "disable-2fa-confirmation": fs.readFileSync(
    `${__dirname}/disable-2fa-confirmation.html`,
    "utf8"
  ),
  "signed-in-with-google": fs.readFileSync(
    `${__dirname}/signed-in-with-google.html`,
    "utf-8"
  ),
};
const subjectTemplate = {
  "forget-password-verification-code": `{{product_name}}`,
  "new-post-notification": `{{product_name}}`,
  "enable-2fa-confirmation": `{{product_name}}`,
  "disable-2fa-confirmation": `{{product_name}}`,
  "signed-in-with-google": `{{product_name}} - Security Message`,
};

export default Object.freeze({
  emailTextTemplate,
  subjectTemplate,
  defaultTemplateData,
});

export { emailTextTemplate, subjectTemplate, defaultTemplateData };
