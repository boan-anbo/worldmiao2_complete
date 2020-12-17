export enum BookProvider {
  LIBRARY_GENESIS= 'LIBRARY_GENESIS',
  OPEN_LIBRARY = 'OPEN_LIBRARY',
  GOOGLE_BOOKS = 'GOOGLE_BOOKS',
  WORLD_CAT = 'WORLD_CAT',
  MEMORY_OF_THE_WORLD = 'MEMORY_OF_THE_WORLD',
}

export enum BookDataType {
  BOOKS = 'BOOKS',
  BOOK_ACCESS = 'BOOK_ACCESS'
}

export enum BookAccessType {
  DOWNLOAD= 'DOWNLOAD',
  BORROW = 'BORROW',
  PURCHASE = 'PURCHASE',
  EBOOK = 'EBOOK',
  DATABASE = 'DATABASE'
}

export interface UniqueId {
  id: string;
  idNote: string;
}

export class BookAccess {
  constructor(link: string, type: BookAccessType) {
    this.link = link;
    this.type = type;
  }

  link: string;

  id: string = '';

  name: string = '';

  type: BookAccessType
}

export class Book {
  title: string = '';

  pages: string = '';

  subtitle: string = '';

  description: string = '';

  author: string = ' ';

  publicationYear: number = 0;

  isbns: string [] = [];

  readonly uniqueIdentifier: UniqueId;

  publisher: string = '';

  format: string = '';

  provider: BookProvider

  thumbnail: string = '';

  constructor(provider: BookProvider, uniqueId?: UniqueId, title?: string) {
    this.provider = provider;
    this.uniqueIdentifier = uniqueId ?? { id: '', idNote: '' };
    this.title = title ?? '';
  }

  access: BookAccess[] = [];
}
