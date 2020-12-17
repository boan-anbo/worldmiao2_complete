import {HttpService, Injectable} from '@nestjs/common';
import {Book, BookAccess, BookAccessType, BookProvider} from '@components/scraper/entities/book.entity';
import {defaultDatabaseMap} from '@components/scraper/scraper-services/worldcat/worldcat.entity';

const cheerio = require('cheerio');

const searchUrl = 'http://www.worldcat.org/search?&fq=((x0:book x4:digital))&q=';
const bookUrl = 'http://www.worldcat.org/title/random/oclc/';
const editionsUrl = '/editions?&fq=(x0:book x4:digital)';
const libUrlStart = 'http://www.worldcat.org/wcpa/servlet/org.oclc.lac.ui.ajax.ServiceServlet?wcoclcnum=';
const libUrlEnd = '&ht=edition&serviceCommand=holdingsdata';
const libUrlEntryStart = '&start_holding=';
const libUrlLocation = '&loc=';
const searchCache = {};
const libCache = {};

@Injectable()
export class WorldcatService {
  constructor(private http: HttpService) {}

  async searchBooks(searchTerm: string) {
    const { data } = await this.http.get(searchUrl + searchTerm)
      .toPromise();
    const $ = cheerio.load(data);
    const books: Book[] = [];

    $('.menuElem')
      // @ts-ignore
      .each((i, element) => {
        const $element = $(element);
        const thumbnail = $element.find('td a img')?.attr('src');
        const title = $element.find('td.result strong')?.text();
        const $id = $element.find('div.oclc_number');
        const worldcatID = $id.text();
        const author = $element.find('div.author')
          .text().replace('by ', '');

        let publicationYear = $element.find('div.publisher')
          .text();
        publicationYear = publicationYear.match(/[© ](\d{4})/) ? publicationYear.match(/[© ](\d{4})/)[1] : '';

        const newBook = new Book(BookProvider.WORLD_CAT, {
          id: worldcatID,
          idNote: 'worldcat id',
        });
        newBook.title = title;
        newBook.publicationYear = publicationYear;
        newBook.author = author;
        newBook.thumbnail = thumbnail.match(/\/\/(.*)\?S/) ? thumbnail.match(/\/\/(.*)\?S/)[1] : '';
        books.push(newBook);
      });

    books.forEach((i) => this.getAvailableDatabases(i.uniqueIdentifier.id));
    return books;
  }

  async getAvailableDatabases(worldcatId: string): Promise<BookAccess[]> {
    const { data } = await this.http.get(`${bookUrl}${worldcatId}`).toPromise();
    // const links: any[] = [];
    const $ = cheerio.load(data);
    // @ts-ignore
    const linkArr = $('.links-856 a').toArray();
    if (linkArr.length > 0) {
      // @ts-ignore

      const extractedLinks: {label: string, link: string} [] = linkArr
        .filter(
          // @ts-ignore
          (link) => link.children?.length > 0,
        )
        .map((link: unknown) => {
          return {
            // @ts-ignore
            label: link.children[0].data,
            // @ts-ignore
            link: link.attribs.title,
          };
        });
      const accesses: BookAccess[] = [];
      extractedLinks.forEach((extractedLink) => {
        const found = defaultDatabaseMap.find((item) => item.worldcatLabel === extractedLink.label);
        if (found) {
          accesses.push({
            link: extractedLink.link,
          type: BookAccessType.DATABASE,
            name: found.name,
              id: '',
          });
        }
      });
      return accesses;
    }
    return [];
  }
}
