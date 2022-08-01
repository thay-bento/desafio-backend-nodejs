import Redis from 'ioredis';
export class RedisMethods {
  private redis: Redis;

  constructor() {
    this.redis = new Redis(
      parseInt(process.env.REDIS_HOST) || 6379,
      process.env.REDIS_HOST || 'localhost',
    );
  }

  async get(key: string): Promise<any> {
    const value = await this.redis.get(key);
    return value ? JSON.parse(value) : null;
  }

  set(key: string, value: object): Promise<string> {
    return this.redis.set(key, JSON.stringify(value));
  }

  del(key: string) {
    return this.redis.del(key);
  }
}
