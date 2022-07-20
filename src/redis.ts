import Redis from 'ioredis';

const redis = new Redis();

// const redis = new Redis({
//     host: process.env.REDIS_HOST || "localhost",
//     port: process.env.REDIS_HOST || 6379,
//     keyPrefix: "cache:"

// });

async function get(key: string) {
  const value = await redis.get(key);
  return value ? JSON.parse(value) : null;
}

function set(key: string, value: object) {
  return redis.set(key, JSON.stringify(value));
}

export { redis };
