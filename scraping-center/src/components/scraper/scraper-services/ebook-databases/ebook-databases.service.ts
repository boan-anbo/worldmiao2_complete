import { Injectable } from '@nestjs/common';
import { Brackets, getManager } from 'typeorm';
import BookEntity from '@components/scraper/entities/bookEntity.entity';
import { Book, BookProvider } from '@components/scraper/entities/book.model';

@Injectable()
export class EbookDatabasesService {
  async search(query: string, provider: BookProvider): Promise<Book[]> {
    const manager = getManager();
    // query = query.replace(/\s/g, '');
    console.log(`searching ebook database: %${query}%`);
    const result = await manager.getRepository<BookEntity>(BookEntity)
      .createQueryBuilder('book')
      .where('book.provider = :provider', { provider })
      .andWhere(
        new Brackets((qb) => {
          qb.where(`tsv_search_text @@ plainto_tsquery('${query}')`)
            .orWhere('book.title LIKE :query', { query: `%${query}%` });
        }),
      )

      .leftJoinAndSelect('book.access', 'access')
      .leftJoinAndSelect('book.uniqueIdentifier', 'uniqueId')
      // order by postgres's ts_rank function
      .orderBy(`ts_rank(tsv_search_text, plainto_tsquery('${query}'))`, 'DESC')
      .limit(20)
      .getMany();
    return result.map((item) => {
      const newBook = new Book(BookProvider.WORLD_CAT);
      return Object.assign(newBook, item);
    });
  }

  async addRecord() {

  }
}
