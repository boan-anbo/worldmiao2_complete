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

  async checkBooksCache(title: string, provider: BookProvider): Promise<Book[] | null> {
    const result = await this.redisClient.get(`Books-${provider}-${title}`);
    if (result) {
      return JSON.parse(result) as Book[];
    }
    return null;
  }

  saveBooksCache(title: string, provider: BookProvider, books: Book[]) {
    const stringBooks = JSON.stringify(books);

    return this.redisClient.set(
      `Books-${provider}-${title}`,
      stringBooks,
    );
  }

  async checkBookAccessCache(title: string, provider: BookProvider): Promise<BookAccess | null> {
    const result = await this.redisClient.get(`BookAccess-${provider}-${title}`);
    if (result) {
      return JSON.parse(result) as BookAccess;
    }
    return null;
  }

  async saveBookAccessCache(title: string, provider: BookProvider, bookAccess: BookAccess | null) {
    const stringBookAccess = JSON.stringify(bookAccess);

    return this.redisClient.set(
      `BookAccess-${provider}-${title}`,
      stringBookAccess,
    );
  }

  async flushAllBooks() {
    return this.redisClient.flushall();
  }
}
