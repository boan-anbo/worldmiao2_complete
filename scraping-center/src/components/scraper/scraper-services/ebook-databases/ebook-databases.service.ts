import { Injectable } from '@nestjs/common';
import { getManager } from 'typeorm';
import BookEntity from '@components/scraper/entities/bookEntity.entity';
import { Book, BookProvider } from '@components/scraper/entities/book.model';

@Injectable()
export class EbookDatabasesService {
  async search(title: string): Promise<Book[]> {
    const manager = getManager();
    console.log(`searching ebook database: ${title}`);
    const result = await manager.getRepository<BookEntity>(BookEntity)
      .createQueryBuilder('book')
      .where(`tsv_search_text @@ plainto_tsquery('${title}')`)
      .leftJoinAndSelect('book.access', 'access')
      .leftJoinAndSelect('book.uniqueIdentifier', 'uniqueId')
      .getMany();
    return result.map((item) => {
      const newBook = new Book(BookProvider.WORLD_CAT);
      return Object.assign(newBook, item);
    });
  }

  async addRecord() {

  }
}
