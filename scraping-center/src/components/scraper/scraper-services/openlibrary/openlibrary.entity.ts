export interface OpenLibraryResult {
  numFound: number;
  start: number;
  docs: Doc[];
  num_found: number;
}

export interface Doc {
  has_fulltext: boolean;
  title: string;
  title_suggest: string;
  type: Type;
  ebook_count_i: number;
  edition_count: number;
  key: string;
  last_modified_i: number;
  first_publish_year: number;
  author_name?: string[];
  id_goodreads?: string[];
  publish_year: number[];
  author_key?: string[];
  seed: string[];
  isbn?: string[];
  oclc?: string[];
  edition_key: string[];
  publisher: string[];
  text: string[];
  publish_date: string[];
  cover_edition_key?: string;
  subject?: string[];
  language?: Language[];
  id_librarything?: string[];
  lcc?: string[];
  lccn?: string[];
  publish_place?: string[];
  contributor?: string[];
  place?: string[];
  cover_i?: number;
  id_amazon?: string[];
  subtitle?: string;
  lending_identifier_s?: string;
  ia_collection_s?: string;
  printdisabled_s?: string;
  public_scan_b?: boolean;
  lending_edition_s?: string;
  ia_box_id?: string[];
  ia?: string[];
  ddc?: string[];
  ia_loaded_id?: string[];
  time?: string[];
  author_alternative_name?: string[];
  person?: string[];
}

export enum Language {
  Eng = 'eng',
}

export enum Type {
  Work = 'work',
}

export interface OpenLibrarySingleBookResult {
  bib_key: string;
  info_url: string;
  preview: string;
  preview_url: string;
  thumbnail_url: string;
}
