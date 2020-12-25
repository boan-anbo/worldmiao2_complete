export enum BookProvider {
  LIBRARY_GENESIS= 'LIBRARY_GENESIS',
  OPEN_LIBRARY = 'OPEN_LIBRARY',
  GOOGLE_BOOKS = 'GOOGLE_BOOKS',
  WORLD_CAT = 'WORLD_CAT',
  MEMORY_OF_THE_WORLD = 'MEMORY_OF_THE_WORLD',
  ZLIBRARY = 'ZLIBRARY',
  PROLETARIAT = 'PROLETARIAT',
  GUTENBERG = 'GUTENBERG',
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
  DATABASE = 'DATABASE',
  BROWSE = 'BROWSE'
}

export interface UniqueId {
  id: string;
  idNote: string;
}

export class BookAccess {
  constructor(link: string, type: BookAccessType, name?: string) {
    this.link = link;
    this.type = type;
    this.name = name ?? ''
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

  publicationYear: string = '';

  isbns: string [] = [];

  readonly uniqueIdentifier: UniqueId;

  publisher: string = '';

  format: string = '';

  provider: BookProvider

  size? = '';

  thumbnail: string = '';

  constructor(provider: BookProvider, uniqueId?: UniqueId, title?: string) {
    this.provider = provider;
    this.uniqueIdentifier = uniqueId ?? { id: '', idNote: '' };
    this.title = title ?? '';
  }

  access: BookAccess[] = [];
}
