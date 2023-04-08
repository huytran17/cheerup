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
};
const subjectTemplate = {
  "forget-password-verification-code": `Forget password`,
  "new-post-notification": `New Post From {{product_name}}!`,
};

export default Object.freeze({
  emailTextTemplate,
  subjectTemplate,
  defaultTemplateData,
});

export { emailTextTemplate, subjectTemplate, defaultTemplateData };
