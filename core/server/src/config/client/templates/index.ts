import fs from "fs";
import { template_data } from "./template-data";

const templates = {
  home: fs.readFileSync(`${__dirname}/home.html`, "utf8"),
};

export { templates, template_data };
