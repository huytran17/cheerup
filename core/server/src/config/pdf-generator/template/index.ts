import fs from "fs";

const template = {
  post: fs.readFileSync(`${__dirname}/post.html`, "utf8"),
};

export default Object.freeze({
  template,
});

export { template };
