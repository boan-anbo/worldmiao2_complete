import { HttpService, Injectable, NotFoundException } from '@nestjs/common';
import {
  Book, BookAccess, BookAccessType, BookProvider,
} from '@components/scraper/entities/book.entity';
import { OpenLibraryResult, OpenLibrarySingleBookResult } from '@components/scraper/scraper-services/openlibrary/openlibrary.entity';

@Injectable()
export class OpenlibraryService {
  constructor(private http: HttpService) {}

  async search(title: string): Promise<Book[]> {
    const response = await this.http.get(`http://openlibrary.org/search.json?q=${title}`)
      .toPromise();
    const { data } = response;

    // fetch data, filter out editions without ebook. map to standard Book entity array;
    const validBooks: Book[] = (data as OpenLibraryResult).docs.filter((doc) => doc.has_fulltext).map((doc) => {
      const newBook = new Book(BookProvider.OPEN_LIBRARY, { id: doc.cover_edition_key ?? '', idNote: 'open library olid' });
      newBook.title = doc.title;
      newBook.author = doc.author_name?.join(', ') ?? 'unknown';
      // ISBN is not neede for now
      // doc.isbn?.forEach((i) => newBook.isbns.push(i));
      newBook.publicationYear = doc.first_publish_year;

      return newBook;
    });
    return validBooks;
  }

  async fetchBook(uniqueId: string): Promise<BookAccess | null> {
    if (!uniqueId) {
      throw new NotFoundException('Invalid book id');
    }

    console.log('Fetching Book Id, ', uniqueId);

    const OLID = uniqueId;
    const url = `http://openlibrary.org/api/books?bibkeys=OLID:${OLID}&format=json`;

    const { data } = await this.http.get(url).toPromise();

    const access: OpenLibrarySingleBookResult = data[`OLID:${OLID}`];
    if (access) {
      const newAccess = new BookAccess(access?.preview_url ?? access?.info_url, BookAccessType.BORROW);
      console.log('Found Access', newAccess);
      return newAccess;
    }
    console.log('Did not find access', access);
    return null;
  }
}
