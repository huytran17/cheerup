import rateLimit, { RateLimitRequestHandler } from "express-rate-limit";

export type IExpressRateLimitOptions = () => RateLimitRequestHandler;

export default function makeExpressRateLimit({
  options,
  NODE_ENV,
}: {
  options: Record<string, unknown>;
  NODE_ENV: string;
}): IExpressRateLimitOptions {
  return function expressRateLimit(): RateLimitRequestHandler {
    //disable for development
    if (NODE_ENV === "development") {
      return;
    }

    return rateLimit({ ...options });
  };
}
