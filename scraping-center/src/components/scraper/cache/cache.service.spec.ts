import { Test, TestingModule } from '@nestjs/testing';
import { RedisModule, RedisService } from 'nestjs-redis';
import { CacheService } from './cache.service';
import { REDIS_CLIENT, REDIS_MODULE_OPTIONS } from 'nestjs-redis/dist/redis.constants';
import { RedisCoreModule } from 'nestjs-redis/dist/redis-core.module';

describe('CacheService', () => {
  let service: CacheService;
  // let redisClient: Redis.Redis;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [RedisModule],
      providers: [CacheService, RedisService,
    }).compile();

    service = module.get<CacheService>(CacheService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
