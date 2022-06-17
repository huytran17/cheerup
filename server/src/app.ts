import express from "express";
import helmet from "helmet";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();

app.use(helmet());
app.use(helmet.xssFilter());
app.use(helmet.hidePoweredBy());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
