

export enum BookProvider {
    LIBRARY_GENESIS= 'LIBRARY_GENESIS',
    OPEN_LIBRARY = 'OPEN_LIBRARY',
    WORLD_CAT = 'WORLD_CAT',
    GOOGLE_BOOKS = 'GOOGLE_BOOKS',
    MEMORY_OF_THE_WORLD = 'MEMORY_OF_THE_WORLD',
}

export const BookProviderList: { providerName: string, providerEnum: BookProvider }[] = [
    {
        providerName: "Library Genesis",
        providerEnum: BookProvider.LIBRARY_GENESIS
    },
    {
        providerName: "Internet Archive",
        providerEnum:BookProvider.OPEN_LIBRARY,
    },
    {
        providerName: "eBook Databases",
        providerEnum: BookProvider.WORLD_CAT
    },
    {
        providerName: "Google Books",
        providerEnum:   BookProvider.GOOGLE_BOOKS,
    },

    //
    // {
    //     providerName: "Memory of the World",
    //     providerEnum:  BookProvider.MEMORY_OF_THE_WORLD
    // },
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

