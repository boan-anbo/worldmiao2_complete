import { HttpService, Injectable } from '@nestjs/common';
import { InjectContext } from 'nest-puppeteer';
import { BrowserContext } from 'puppeteer';
import {
  Book, BookAccess, BookAccessType, BookProvider,
} from '@components/scraper/entities/book.model';

@Injectable()
export class ZlibraryService {
  constructor(
      private http: HttpService,
      @InjectContext() private readonly browserContext: BrowserContext,
  ) {}

  async search(title: string): Promise<Book[]> {
    const url = `https://b-ok.cc/s/${encodeURI(title)}`;

    // const { data } = await this.http.get(url).toPromise();

    const page = await this.browserContext.newPage();
    console.log(page.isClosed());

    await page.goto(url, { waitUntil: 'networkidle0' });

    const rawInfo: {
      author: string,
      title: string,
      link: string,
      format: string,
      uniqueId: string,
      publisher: string,
      publicationYear: number
      thumbnail: string
    }[] = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('table .resItemTable'))?.map((element) => {
        const bookBaseUrl = 'https://b-ok.cc';

        const titleDiv = element.querySelector('h3[itemprop="name"]');

        const author = Array.from(element.querySelectorAll('a[itemprop="author"]'))?.map((a) => a.textContent?.trim()).join(', ') ?? '';
        const title = titleDiv?.textContent?.trim() ?? '';

        const shortLink = titleDiv?.querySelector('a')?.getAttribute('href')?.trim() ?? '';
        const shortLinkLength = shortLink.split('/')?.length ?? 0;
        const uniqueId = shortLink.split('/').slice(shortLinkLength - 2, shortLinkLength).join('/') ?? '';

        const link = bookBaseUrl + shortLink;

        const publisher = element.querySelector('div[title="Publisher"]')?.textContent?.trim() ?? '';
        const format = element.querySelector('div .property__file > .property_value')?.textContent?.trim().split(',')[0] ?? '';
        const publicationYearStr = element.querySelector('div .property_year > .property_value')?.textContent?.trim().split(',')[0] ?? '';
        const publicationYear = parseInt(publicationYearStr);

        const thumbnail = element.querySelector('img')?.getAttribute('src')?.trim() ?? '';
        console.log('thumbnai', thumbnail);
        return {
          author, title, link, format, uniqueId, publisher, publicationYear, thumbnail,
        };
      });
    });
    console.log(page.isClosed());
    await page.close();
    console.log(page.isClosed());
    // await this.browserContext.browser().close();
    // await this.browserContext.close();
    return rawInfo.map((item) => {
      const newBook = new Book(BookProvider.ZLIBRARY, { id: item.uniqueId, idNote: 'zlibrary collection and id' }, item.title);
      newBook.author = item.author;
      newBook.format = item.format;
      newBook.publisher = item.publisher;
      newBook.access.push(new BookAccess(item.link, BookAccessType.DOWNLOAD));
      newBook.publicationYear = String(item.publicationYear);
      newBook.thumbnail = item.thumbnail;
      return newBook;
    });
  }
}
