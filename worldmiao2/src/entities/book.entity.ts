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

// 3 places to update: (1) this provider list (2) bookstore, (3) search store in App.Vue
export const BookProviderList: { providerName: string, providerEnum: BookProvider, url?: string, beingMaintained: null | string, holdings?: string }[] = [
    {
        providerName: "Z Library",
        providerEnum: BookProvider.ZLIBRARY,
        url: 'https://z-lib.org/',
        beingMaintained: null
    },
    {
        providerName: "eBook Databases",
        providerEnum: BookProvider.WORLD_CAT,
        url: '',
        // beingMaintained: 'under maintenance. fetch disabled.'
        beingMaintained: null,
        holdings: '320,000 +'
    },
    {
        providerName: "Google Books",
        providerEnum:   BookProvider.GOOGLE_BOOKS,
        url: 'https://books.google.com/',
        beingMaintained: null
    },

    {
        providerName: "Library Genesis",
        providerEnum: BookProvider.LIBRARY_GENESIS,
        url: 'http://gen.lib.rus.ec/',
        beingMaintained: null
    },
    {
        providerName: "Project Gutenberg",
        providerEnum: BookProvider.GUTENBERG,
        url: 'http://www.gutenberg.org',
        beingMaintained: null,
        holdings: '60,000 +'
    },
    {
        providerName: "Open Library",
        providerEnum:BookProvider.OPEN_LIBRARY,
        url: 'http://openlibrary.org/',
        beingMaintained: null,
        holdings: '1,400,000 +'
    },

    {
        providerName: "Proletariat Library",
        providerEnum: BookProvider.PROLETARIAT,
        url: 'https://library.proletarian.me/',
        beingMaintained: null,
        holdings: '10,000 +'
    },
    {
        providerName: "Memory of the World",
        providerEnum:  BookProvider.MEMORY_OF_THE_WORLD,
        url: 'https://library.memoryoftheworld.org/',
        beingMaintained: null,
        holdings: '150,000 +'
    },



]

export enum BookDataType {
    BOOKS = "BOOKS",
    BOOK_ACCESS = "BOOK_ACCESS"
}

export enum BookAccessType {
    DOWNLOAD= "DOWNLOAD",
    BORROW = "BORROW",
    PURCHASE = "PURCHASE",
    EBOOK = "EBOOK",
    DATABASE = 'DATABASE'
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

    name = ''

    id: string = '';

    type: BookAccessType
}

export class Book {
    id: string = ''
    title: string = '';

    pages: string = '';

    subtitle: string = '';

    description: string = '';

    author: string = ' ';

    publicationYear: number = 0;

    isbns: string [] = [];

    readonly uniqueIdentifier: UniqueId;

    publisher: string  = '';

    format: string = '';

    provider: BookProvider | null

    thumbnail: string = '';

    emptyBook = false;

    constructor(provider: BookProvider | null, uniqueId?: UniqueId, title?: string) {
        this.provider = provider;
        if (provider === null) {
            this.emptyBook = true;
        }

        this.uniqueIdentifier = uniqueId ?? {id: '', idNote: ''};
        this.title = title ?? '';
    }

    access: BookAccess[] = [];
}

