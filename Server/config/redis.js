const { createClient } = require("redis");

let redisClient = null;
let redisConnectPromise = null;

function shouldForceTls(redisUrl) {
  if (!redisUrl) return false;
  if (process.env.REDIS_TLS === "true") return true;
  if (redisUrl.startsWith("rediss://")) return true;
  return false;
}

function normalizeRedisUrl(redisUrl) {
  if (!redisUrl) return redisUrl;
  if (redisUrl.startsWith("rediss://")) return redisUrl;
  if (redisUrl.startsWith("redis://") && shouldForceTls(redisUrl)) {
    const upgraded = redisUrl.replace(/^redis:\/\//i, "rediss://");
    return upgraded;
  }

  return redisUrl;
}

async function connectRedis() {
  if (redisClient) {
    return redisClient;
  }

  if (redisConnectPromise) {
    return redisConnectPromise;
  }

  const redisUrlRaw = process.env.REDIS_URL;
  if (!redisUrlRaw) {
    console.warn("Redis not configured, using MongoDB fallback");
    return null;
  }

  const redisUrl = normalizeRedisUrl(redisUrlRaw);
  const tlsEnabled = process.env.REDIS_TLS === "true" || redisUrl.startsWith("rediss://");
  const rejectUnauthorized = process.env.REDIS_TLS_REJECT_UNAUTHORIZED !== "false";

  redisConnectPromise = (async () => {
    try {
      redisClient = createClient({
        url: redisUrl,
        disableOfflineQueue: true,
        socket: {
          ...(tlsEnabled ? { tls: true, rejectUnauthorized } : {}),
          reconnectStrategy: (retries) => {
            if (process.env.REDIS_DISABLE_RETRY === "true") {
              return new Error("Redis retries disabled");
            }
            if (retries > 20) {
              return new Error("Redis reconnect retries exhausted");
            }
            return Math.min(retries * 100, 2000);
          },
        },
      });

      redisClient.on("error", (err) => {
        console.error("Redis runtime error:", err?.message || err);
      });

      await redisClient.connect();
      console.log("Redis connected successfully");
      return redisClient;
    } catch (error) {
      console.error("Redis connection failed:", error?.message || error);
      try {
        if (redisClient) {
          await redisClient.quit();
        }
      } catch {

      }
      redisClient = null;
      return null;
    } finally {
      redisConnectPromise = null;
    }
  })();

  return redisConnectPromise;
}

function getRedisClient() {
  return redisClient;
}

async function cacheGet(key) {
  if (!redisClient || !redisClient.isReady) return null;
  try {
    const data = await redisClient.get(key);
    if (data) {
      return JSON.parse(data);
    } else {
      return null;
    }
  } catch (error) {
    console.error("Redis get error:", error.message, "key:", key);
    return null;
  }
}

async function cacheSet(key, data, ttlSeconds = 900) {
  if (!redisClient || !redisClient.isReady) return;
  try {
    await redisClient.setEx(key, ttlSeconds, JSON.stringify(data));
  } catch (error) {
    console.error("Redis set error:", error.message, "key:", key);
  }
}

async function cacheDelete(pattern) {
  if (!redisClient || !redisClient.isReady) return;
  try {
    const keys = await redisClient.keys(pattern);
    if (keys.length > 0) {
      await redisClient.del(keys);
    }
  } catch (error) {
    console.error("Redis delete error:", error.message, "pattern:", pattern);
  }
}

module.exports = { connectRedis, getRedisClient, cacheGet, cacheSet, cacheDelete };
