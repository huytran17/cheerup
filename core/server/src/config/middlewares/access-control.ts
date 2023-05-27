import { Request } from "express";

const whitelist = [
  process.env.ADMIN_DASHBOARD_URL,
  process.env.USER_DASHBOARD_URL,
];

const corsOptionsDelegate = function (req: Request, callback: Function) {
  const cors_options: Record<string, unknown> = {
    methods: "GET,PUT,POST,DELETE",
    credentials: true,
  };

  if (whitelist.includes(req.header("Origin"))) {
    Object.assign(cors_options, { origin: true });
  } else {
    Object.assign(cors_options, { origin: false });
  }

  callback(null, cors_options);
};

export { corsOptionsDelegate };
