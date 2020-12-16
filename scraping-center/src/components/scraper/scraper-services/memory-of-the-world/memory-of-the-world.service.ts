import { HttpService, Injectable } from '@nestjs/common';
import { InjectContext } from 'nest-puppeteer';
import { BrowserContext } from 'puppeteer';
import {
  Book, BookAccess, BookAccessType, BookProvider,
} from '@components/scraper/entities/book.entity';

@Injectable()
export class MemoryOfTheWorldService {
  constructor(private http: HttpService,
    @InjectContext() private readonly browserContext: BrowserContext) {}

  async search(searchTitle: string): Promise<Book[]> {
    // await this.browserContext.browser().

    const page = await this.browserContext.newPage();
    console.log(page.isClosed());

    await page.goto(`https://library.memoryoftheworld.org/#/search/titles/${searchTitle}`, { waitUntil: 'networkidle0' });

    const rawInfo: {
      author: string,
      title: string,
      link: string,
      format: string,
      uniqueId: string,
    }[] = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('div .cover'))?.map((element) => {
        const baseUrl = 'https://library.memoryoftheworld.org/';
        const titleDiv = element.querySelector('a[title="show book card"]');

        const author = element.querySelector('[title="search in authors"]')?.textContent ?? '';
        const title = titleDiv?.textContent ?? '';
        const link = baseUrl + titleDiv?.getAttribute('href') ?? '';
        const format = element.querySelector('i')?.textContent?.trim().replace(',', '') ?? '';
        const uniqueId = link.split('/')[link.split('/').length - 1];
        return {
          author, title, link, format, uniqueId,
        };
      });
    });
    console.log(page.isClosed());
    await page.close();
    console.log(page.isClosed());
    // await this.browserContext.browser().close();
    // await this.browserContext.close();
    return rawInfo.map((item) => {
      const newBook = new Book(BookProvider.MEMORY_OF_THE_WORLD, { id: item.uniqueId, idNote: 'memory of the world id' }, item.title);
      newBook.author = item.author;
      newBook.format = item.format;
      newBook.access.push(new BookAccess(item.link, BookAccessType.DOWNLOAD));
      return newBook;
    });
  }
}
