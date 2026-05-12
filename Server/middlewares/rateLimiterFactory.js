const rateLimit = require("express-rate-limit");
const { RedisStore } = require("rate-limit-redis");
const { getRedisClient } = require("../config/redis");


const STORE_LOG_COOLDOWN_MS = 60 * 1000;
const storeLogState = new Map();

const shouldLogStoreEvent = (policyName, eventName) => {
  const key = `${policyName}:${eventName}`;
  const now = Date.now();
  const previous = storeLogState.get(key) || 0;

  if (now - previous < STORE_LOG_COOLDOWN_MS) {
    return false;
  }

  storeLogState.set(key, now);
  return true;
};

const getClientIp = (req) => {
  if (typeof req?.ip === "string" && req.ip.trim().length > 0) {
    return req.ip.trim();
  }

  const xForwardedFor = req?.headers?.["x-forwarded-for"];
  if (typeof xForwardedFor === "string" && xForwardedFor.trim().length > 0) {
    return xForwardedFor.split(",")[0].trim();
  }

  return req?.socket?.remoteAddress || "unknown";
};

const defaultKeyGenerator = (req) => {
  if (req?.user?.id) {
    return `user:${req.user.id}`;
  }

  return `ip:${getClientIp(req)}`;
};

const buildRetryAfterSeconds = (req) => {
  const resetTime = req?.rateLimit?.resetTime;
  if (!resetTime) {
    return null;
  }

  const resetMs = resetTime instanceof Date ? resetTime.getTime() : Number(resetTime);
  if (!Number.isFinite(resetMs)) {
    return null;
  }

  return Math.max(0, Math.ceil((resetMs - Date.now()) / 1000));
};

const buildRedisStore = (policyName) => {
  const redisClient = getRedisClient();

  if (!redisClient || !redisClient.isReady) {
    if (shouldLogStoreEvent(policyName, "redis-memory-fallback")) {
      console.warn(`Rate limiter store fallback: ${policyName} - redis unavailable`);
    }

    return undefined;
  }

  try {
    return new RedisStore({
      prefix: `rl:${policyName}:`,
      sendCommand: async (...args) => {
        try {
          return await redisClient.sendCommand(args);
        } catch (error) {
          if (shouldLogStoreEvent(policyName, "redis-command-failed")) {
            console.error(`Rate limiter Redis command failed: ${policyName}`, error?.message || error);
          }

          throw error;
        }
      },
    });
  } catch (error) {
    if (shouldLogStoreEvent(policyName, "redis-memory-fallback")) {
      console.warn(`Rate limiter store init failed, falling back: ${policyName}`, error?.message || error);
    }

    return undefined;
  }
};

const createRateLimiter = ({
  policyName,
  windowMs,
  max,
  message,
  keyGenerator = defaultKeyGenerator,
  skipSuccessfulRequests = false,
  skipFailedRequests = false,
  onViolation,
}) => {
  if (!policyName) {
    throw new Error("createRateLimiter requires a policyName");
  }

  const violationHook = typeof onViolation === "function" ? onViolation : () => {};

  return rateLimit({
    windowMs,
    limit: max,
    keyGenerator,
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulRequests,
    skipFailedRequests,
    store: buildRedisStore(policyName),
    passOnStoreError: true,
    message: {
      success: false,
      message,
    },
    handler: (req, res, _next, options) => {
      const keyType = req?.user?.id ? "user" : "ip";
      const identifier = keyGenerator(req);
      const violationEvent = {
        policyName,
        keyType,
        identifier,
        userId: req?.user?.id || null,
        ip: getClientIp(req),
        method: req.method,
        path: req.originalUrl || req.url,
      };

      console.warn("Rate limit exceeded:", violationEvent);

      try {
        violationHook(violationEvent);
      } catch (error) {
        console.error(`Rate limiter violation hook failed: ${policyName}`, error.message);
      }

      const retryAfterSeconds = buildRetryAfterSeconds(req);
      const responsePayload = {
        success: false,
        message:
          typeof options.message === "string"
            ? options.message
            : options.message?.message || message,
        policy: policyName,
      };

      if (retryAfterSeconds !== null) {
        responsePayload.retryAfterSeconds = retryAfterSeconds;
      }

      return res.status(options.statusCode || 429).json(responsePayload);
    },
  });
};

module.exports = {
  createRateLimiter,
  defaultKeyGenerator,
  getClientIp,
};
