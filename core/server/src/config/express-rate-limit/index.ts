import makeExpressRateLimit from "./make-express-rate-limit";

const express_rate_limit_options = {
  windowMs: 15 * 60 * 1000,
  max: 2000,
  standardHeaders: true,
  legacyHeaders: false,
  message: "Too many request from this IP, please try again after 15 minutes",
};

const expressRateLimit = makeExpressRateLimit({
  options: express_rate_limit_options,
});

export default Object.freeze({
  expressRateLimit,
});

export { expressRateLimit };
