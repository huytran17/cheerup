import { Request } from "express";

const corsOptionsDelegate = function (req: Request, callback: Function) {
  const white_list = [
    process.env.ADMIN_DASHBOARD_URL,
    process.env.USER_DASHBOARD_URL,
  ];

  const req_options = {
    methods: ["GET,PUT,POST,DELETE"],
    allowedHeaders: "Content-Type,Origin,X-Requested-With,Authorization",
    credentials: true,
  };

  let cors_options: Record<string, unknown>;

  if (white_list.includes(req.header("Origin"))) {
    cors_options = { origin: true };
  } else {
    cors_options = { origin: false };
  }

  callback(null, {
    ...req_options,
    ...cors_options,
  });
};

export { corsOptionsDelegate };
