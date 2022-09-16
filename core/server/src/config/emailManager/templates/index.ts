import fs from "fs";
import defaultTemplateData from "./email-template-data";

const emailTextTemplate = {
  "reply-comment": fs.readFileSync(`${__dirname}/reply-comment.html`, "utf8"),
};
const subjectTemplate = {
  "reply-comment": `Someone replied to your comment!`,
};

export default Object.freeze({
  emailTextTemplate,
  subjectTemplate,
  defaultTemplateData,
});

export { emailTextTemplate, subjectTemplate, defaultTemplateData };
