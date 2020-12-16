import { HttpService, Injectable } from '@nestjs/common';
import {
  Book, BookAccess, BookAccessType, BookProvider,
} from '@components/scraper/entities/book.entity';
import { GoogleBooksResult } from '@components/scraper/scraper-services/google-books/google-books-entity';

@Injectable()
export class GoogleBooksService {
  constructor(private http: HttpService) {}

  async search(title: String, limits?: number, page?: number): Promise<Book []> {
    const url = `https://www.googleapis.com/books/v1/volumes?q=${title.split(' ').join('+')}&filter=ebooks&maxResults=20`;
    const { data } = await this.http.get(url).toPromise();
    const result: GoogleBooksResult = data;
    if (result.totalItems > 0) {
      return result.items
        .map((item) => {
          const newBook = new Book(BookProvider.GOOGLE_BOOKS, { id: item.id, idNote: 'google id' });
          newBook.isbns = item.volumeInfo.industryIdentifiers?.map((id) => id.identifier);
          newBook.author = item.volumeInfo.authors?.join('; ');
          newBook.title = item.volumeInfo.title;
          newBook.publicationYear = parseInt(item.volumeInfo.publishedDate?.split('-')[0]);
          newBook.description = item.volumeInfo.description ?? '';
          newBook.thumbnail = item.volumeInfo.imageLinks.smallThumbnail;
          newBook.access.push(new BookAccess(item.volumeInfo.canonicalVolumeLink, BookAccessType.EBOOK));
          return newBook;
        });
    }
    return [];
  }
}
