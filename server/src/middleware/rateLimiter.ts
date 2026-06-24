import rateLimit from "express-rate-limit";

class RateLimiter {
  public authlimiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 60,
    message: "Too many requests from this IP, please try again after 5 minutes",
  });
  public rootLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 60,
    message: "Too many requests from this IP, please try again after 1 minute",
  });
}

export const rateLimiting = new RateLimiter();
