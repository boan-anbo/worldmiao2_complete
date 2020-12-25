export interface GutenbergBook {
    id:          number;
    title:       string;
    description: null | string;
    issued:      Date;
    downloads:   number;
    languages:   string[];
    authors:     Author[];
    files:       File[];
    subjects:    string[];
    categories:  string[];
}

export interface Author {
    name:    string;
    birth:   number | null;
    death:   number | null;
    aliases: string[];
    page:    string;
}

export interface File {
    url:      string;
    modified: Date;
    size:     number;
}
