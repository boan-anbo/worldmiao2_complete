import { Injectable } from '@nestjs/common';
import * as Redis from 'ioredis';
import { RedisService } from 'nestjs-redis';
import { Book, BookAccess, BookProvider } from '@components/scraper/entities/book.entity';

@Injectable()
export class CacheService {
  private readonly redisClient: Redis.Redis;

  constructor(private readonly redisService: RedisService) {
    this.redisClient = redisService.getClient();
  }

  saveToCache(key: string, data: any) {
    if (!data) return;
    const stringData = JSON.stringify(data);
    // roughly between 50kb - 500kb
    if (stringData.length > 527128) {
      return;
    }
    this.redisClient.set(key, stringData);
  }

  async checkBooksCache(title: string, provider: BookProvider): Promise<Book[] | null> {
    const result = await this.redisClient.get(`Books-${provider}-${title}`);
    if (result) {
      return JSON.parse(result) as Book[];
    }
    return null;
  }

  saveBooksCache(title: string, provider: BookProvider, books: Book[]) {
    return this.saveToCache(
      `Books-${provider}-${title}`,
      books,
    );
  }

  async checkBookAccessCache(title: string, provider: BookProvider): Promise<BookAccess[] | null> {
    const result = await this.redisClient.get(`BookAccess-${provider}-${title}`);
    if (result) {
      return JSON.parse(result) as BookAccess[];
    }
    return null;
  }

  async saveBookAccessCache(title: string, provider: BookProvider, bookAccess: BookAccess[] | null) {
    return this.saveToCache(
      `BookAccess-${provider}-${title}`,
      bookAccess,
    );
  }

  async flushAllBooks() {
    return this.redisClient.flushall();
  }
}
