import rateLimit, { RateLimitRequestHandler } from "express-rate-limit";

export type ExpressRateLimitOptions = () => RateLimitRequestHandler;

export default function makeExpressRateLimit({
  options,
}: {
  options: Record<string, unknown>;
}): ExpressRateLimitOptions {
  return function expressRateLimit() {
    return rateLimit({ ...options });
  };
}
