import makeExpressRateLimit from "./make-express-rate-limit";

const express_rate_limit_options = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: "Too many request from this IP, please try again after 15 minutes",
};

const expressRateLimit = makeExpressRateLimit({
  options: express_rate_limit_options,
});

export default Object.freeze({
  expressRateLimit,
});

export { expressRateLimit };
