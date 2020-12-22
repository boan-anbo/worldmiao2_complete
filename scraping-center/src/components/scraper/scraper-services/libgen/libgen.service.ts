import { Injectable } from '@nestjs/common';
// @ts-ignore
import * as libgen from 'libgen';
import {
  Book, BookAccess, BookAccessType, BookProvider,
} from '@components/scraper/entities/book.model';

@Injectable()
export class LibgenService {
  async searchLibGen(searchTitle: string): Promise<Book[]> {
    // to fix a big in libgen search, the hyphen needs to be replaced by a space
    searchTitle.replace(/-/g, ' ');
    const options = {
      mirror: 'http://gen.lib.rus.ec',
      query: searchTitle,
      count: 20,
      sort_by: 'year',
      reverse: true,
    };

    try {
      const books: Book[] = [];
      const data = await libgen.search(options);
      let n = data.length;

      // console.log(`${n} results for "${options.query}"`);
      while (n--) {
        const {
          author,
          year,
          pages,
          title,
          extension,
          publisher,
          md5,
          descr,
          toc
        } = data[n];
        // console.log('All Libgen resturn data', JSON.stringify(data[n]))
        const link = `http://gen.lib.rus.ec/book/index.php?md5=${data[n].md5.toLowerCase()}`;
        const newBook = new Book(BookProvider.LIBRARY_GENESIS, { id: md5, idNote: 'Libgen MD5' }, title);
        newBook.author = author;
        newBook.pages = pages;
        newBook.publicationYear = year;
        newBook.publisher = publisher;
        newBook.format = extension;
        newBook.access.push(new BookAccess(link, BookAccessType.DOWNLOAD));
        newBook.description = (descr?.length > 0 ? descr : toc) ?? ''
        books.push(newBook);
      }

      return books;
    } catch (err) {
      console.error(err);
    }

    return [];
  }
}
