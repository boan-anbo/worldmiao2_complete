import { HttpService, Injectable } from '@nestjs/common';
import {InjectContext} from "nest-puppeteer";
import {BrowserContext} from "puppeteer";

const url = 'https://www.book4you.org/s/hollywood';

@Injectable()
export class ZlibraryService {
  constructor(
      private http: HttpService,
      @InjectContext() private readonly browserContext: BrowserContext
      ) {}

  async search(title: string): Promise<string> {


    // const { data } = await this.http.get(url).toPromise();


    const page = await this.browserContext.newPage();
    console.log(page.isClosed());

    await page.goto(url, { waitUntil: 'networkidle0' });

    const content = await page.content()

    console.log(content);

    const doc = await page.evaluate(() => {
      console.log('This is from puppeeteer', document)
      return document
      // return Array.from(document.querySelectorAll('div .cover'))?.map((element) => {
      //   const baseUrl = 'https://library.memoryoftheworld.org/';
      //   const titleDiv = element.querySelector('a[title="show book card"]');
      //
      //   const author = element.querySelector('[title="search in authors"]')?.textContent ?? '';
      //   const title = titleDiv?.textContent ?? '';
      //   const link = baseUrl + titleDiv?.getAttribute('href') ?? '';
      //   const format = element.querySelector('i')?.textContent?.trim().replace(',', '') ?? '';
      //   const uniqueId = link.split('/')[link.split('/').length - 1];
      //   return {
      //     author, title, link, format, uniqueId,
      //   };
      // });
    });
    // console.log(data);
    // const result = data;
    const result = JSON.stringify(doc)
    console.log("result", result)
    return result;
  }
}
