import Redis from 'ioredis';
export class RedisMethods {
  private redis: Redis;

  constructor() {
    this.redis = new Redis();
  }

  async get(key: string): Promise<string> {
    const value = await this.redis.get(key);
    return value ? JSON.parse(value) : null;
  }

  set(key: string, value: object): Promise<string> {
    return this.redis.set(key, JSON.stringify(value));
  }
}
