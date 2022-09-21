import rateLimit, { RateLimitRequestHandler } from "express-rate-limit";

export type IExpressRateLimitOptions = () => RateLimitRequestHandler;

export default function makeExpressRateLimit({
  options,
}: {
  options: Record<string, unknown>;
}): IExpressRateLimitOptions {
  return function expressRateLimit(): RateLimitRequestHandler {
    return rateLimit({ ...options });
  };
}
