// To parse this data:
//
//   import { Convert, GoogleBooksResult } from "./file";
//
//   const googleBooksResult = Convert.toGoogleBooksResult(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface GoogleBooksResult {
  kind: string;
  totalItems: number;
  items: Item[];
}

export interface Item {
  kind: Kind;
  id: string;
  etag: string;
  selfLink: string;
  volumeInfo: VolumeInfo;
  saleInfo: SaleInfo;
  accessInfo: AccessInfo;
  searchInfo?: SearchInfo;
}

export interface AccessInfo {
  country: Country;
  viewability: Viewability;
  embeddable: boolean;
  publicDomain: boolean;
  textToSpeechPermission: TextToSpeechPermission;
  epub: Epub;
  pdf: Epub;
  webReaderLink: string;
  accessViewStatus: AccessViewStatus;
  quoteSharingAllowed: boolean;
}

export enum AccessViewStatus {
  Sample = 'SAMPLE',
}

export enum Country {
  De = 'DE',
}

export interface Epub {
  isAvailable: boolean;
  acsTokenLink?: string;
}

export enum TextToSpeechPermission {
  Allowed = 'ALLOWED',
  AllowedForAccessibility = 'ALLOWED_FOR_ACCESSIBILITY',
}

export enum Viewability {
  Partial = 'PARTIAL',
}

export enum Kind {
  BooksVolume = 'books#volume',
}

export interface SaleInfo {
  country: Country;
  saleability: Saleability;
  isEbook: boolean;
  listPrice?: SaleInfoListPrice;
  retailPrice?: SaleInfoListPrice;
  buyLink?: string;
  offers?: Offer[];
}

export interface SaleInfoListPrice {
  amount: number;
  currencyCode: string;
}

export interface Offer {
  finskyOfferType: number;
  listPrice: OfferListPrice;
  retailPrice: OfferListPrice;
  giftable: boolean;
}

export interface OfferListPrice {
  amountInMicros: number;
  currencyCode: string;
}

export enum Saleability {
  ForSale = 'FOR_SALE',
  NotForSale = 'NOT_FOR_SALE',
}

export interface SearchInfo {
  textSnippet: string;
}

export interface VolumeInfo {
  title: string;
  authors: string[];
  publisher: string;
  publishedDate: string;
  description?: string;
  industryIdentifiers: IndustryIdentifier[];
  readingModes: ReadingModes;
  pageCount: number;
  printType: PrintType;
  categories: Category[];
  maturityRating: MaturityRating;
  allowAnonLogging: boolean;
  contentVersion: string;
  panelizationSummary?: PanelizationSummary;
  imageLinks: ImageLinks;
  language: Language;
  previewLink: string;
  infoLink: string;
  canonicalVolumeLink: string;
  averageRating?: number;
  ratingsCount?: number;
}

export enum Category {
  China = 'China',
  History = 'History',
  JuvenileNonfiction = 'Juvenile Nonfiction',
}

export interface ImageLinks {
  smallThumbnail: string;
  thumbnail: string;
}

export interface IndustryIdentifier {
  type: Type;
  identifier: string;
}

export enum Type {
  Isbn10 = 'ISBN_10',
  Isbn13 = 'ISBN_13',
}

export enum Language {
  En = 'en',
}

export enum MaturityRating {
  NotMature = 'NOT_MATURE',
}

export interface PanelizationSummary {
  containsEpubBubbles: boolean;
  containsImageBubbles: boolean;
}

export enum PrintType {
  Book = 'BOOK',
}

export interface ReadingModes {
  text: boolean;
  image: boolean;
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
  public static toGoogleBooksResult(json: string): GoogleBooksResult {
    return cast(JSON.parse(json), r('GoogleBooksResult'));
  }

  public static googleBooksResultToJson(value: GoogleBooksResult): string {
    return JSON.stringify(uncast(value, r('GoogleBooksResult')), null, 2);
  }
}

function invalidValue(typ: any, val: any, key: any = ''): never {
  if (key) {
    throw Error(`Invalid value for key "${key}". Expected type ${JSON.stringify(typ)} but got ${JSON.stringify(val)}`);
  }
  throw Error(`Invalid value ${JSON.stringify(val)} for type ${JSON.stringify(typ)}`);
}

function jsonToJSProps(typ: any): any {
  if (typ.jsonToJS === undefined) {
    const map: any = {};
    typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
    typ.jsonToJS = map;
  }
  return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
  if (typ.jsToJSON === undefined) {
    const map: any = {};
    typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
    typ.jsToJSON = map;
  }
  return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = ''): any {
  function transformPrimitive(typ: string, val: any): any {
    if (typeof typ === typeof val) return val;
    return invalidValue(typ, val, key);
  }

  function transformUnion(typs: any[], val: any): any {
    // val must validate against one typ in typs
    const l = typs.length;
    for (let i = 0; i < l; i++) {
      const typ = typs[i];
      try {
        return transform(val, typ, getProps);
      } catch (_) {}
    }
    return invalidValue(typs, val);
  }

  function transformEnum(cases: string[], val: any): any {
    if (cases.indexOf(val) !== -1) return val;
    return invalidValue(cases, val);
  }

  function transformArray(typ: any, val: any): any {
    // val must be an array with no invalid elements
    if (!Array.isArray(val)) return invalidValue('array', val);
    return val.map((el) => transform(el, typ, getProps));
  }

  function transformDate(val: any): any {
    if (val === null) {
      return null;
    }
    const d = new Date(val);
    if (isNaN(d.valueOf())) {
      return invalidValue('Date', val);
    }
    return d;
  }

  function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
    if (val === null || typeof val !== 'object' || Array.isArray(val)) {
      return invalidValue('object', val);
    }
    const result: any = {};
    Object.getOwnPropertyNames(props).forEach((key) => {
      const prop = props[key];
      const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
      result[prop.key] = transform(v, prop.typ, getProps, prop.key);
    });
    Object.getOwnPropertyNames(val).forEach((key) => {
      if (!Object.prototype.hasOwnProperty.call(props, key)) {
        result[key] = transform(val[key], additional, getProps, key);
      }
    });
    return result;
  }

  if (typ === 'any') return val;
  if (typ === null) {
    if (val === null) return val;
    return invalidValue(typ, val);
  }
  if (typ === false) return invalidValue(typ, val);
  while (typeof typ === 'object' && typ.ref !== undefined) {
    typ = typeMap[typ.ref];
  }
  if (Array.isArray(typ)) return transformEnum(typ, val);
  if (typeof typ === 'object') {
    return typ.hasOwnProperty('unionMembers') ? transformUnion(typ.unionMembers, val)
      : typ.hasOwnProperty('arrayItems') ? transformArray(typ.arrayItems, val)
        : typ.hasOwnProperty('props') ? transformObject(getProps(typ), typ.additional, val)
          : invalidValue(typ, val);
  }
  // Numbers can be parsed by Date but shouldn't be.
  if (typ === Date && typeof val !== 'number') return transformDate(val);
  return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
  return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
  return transform(val, typ, jsToJSONProps);
}

function a(typ: any) {
  return { arrayItems: typ };
}

function u(...typs: any[]) {
  return { unionMembers: typs };
}

function o(props: any[], additional: any) {
  return { props, additional };
}

function m(additional: any) {
  return { props: [], additional };
}

function r(name: string) {
  return { ref: name };
}

const typeMap: any = {
  GoogleBooksResult: o([
    { json: 'kind', js: 'kind', typ: '' },
    { json: 'totalItems', js: 'totalItems', typ: 0 },
    { json: 'items', js: 'items', typ: a(r('Item')) },
  ], false),
  Item: o([
    { json: 'kind', js: 'kind', typ: r('Kind') },
    { json: 'id', js: 'id', typ: '' },
    { json: 'etag', js: 'etag', typ: '' },
    { json: 'selfLink', js: 'selfLink', typ: '' },
    { json: 'volumeInfo', js: 'volumeInfo', typ: r('VolumeInfo') },
    { json: 'saleInfo', js: 'saleInfo', typ: r('SaleInfo') },
    { json: 'accessInfo', js: 'accessInfo', typ: r('AccessInfo') },
    { json: 'searchInfo', js: 'searchInfo', typ: u(undefined, r('SearchInfo')) },
  ], false),
  AccessInfo: o([
    { json: 'country', js: 'country', typ: r('Country') },
    { json: 'viewability', js: 'viewability', typ: r('Viewability') },
    { json: 'embeddable', js: 'embeddable', typ: true },
    { json: 'publicDomain', js: 'publicDomain', typ: true },
    { json: 'textToSpeechPermission', js: 'textToSpeechPermission', typ: r('TextToSpeechPermission') },
    { json: 'epub', js: 'epub', typ: r('Epub') },
    { json: 'pdf', js: 'pdf', typ: r('Epub') },
    { json: 'webReaderLink', js: 'webReaderLink', typ: '' },
    { json: 'accessViewStatus', js: 'accessViewStatus', typ: r('AccessViewStatus') },
    { json: 'quoteSharingAllowed', js: 'quoteSharingAllowed', typ: true },
  ], false),
  Epub: o([
    { json: 'isAvailable', js: 'isAvailable', typ: true },
    { json: 'acsTokenLink', js: 'acsTokenLink', typ: u(undefined, '') },
  ], false),
  SaleInfo: o([
    { json: 'country', js: 'country', typ: r('Country') },
    { json: 'saleability', js: 'saleability', typ: r('Saleability') },
    { json: 'isEbook', js: 'isEbook', typ: true },
    { json: 'listPrice', js: 'listPrice', typ: u(undefined, r('SaleInfoListPrice')) },
    { json: 'retailPrice', js: 'retailPrice', typ: u(undefined, r('SaleInfoListPrice')) },
    { json: 'buyLink', js: 'buyLink', typ: u(undefined, '') },
    { json: 'offers', js: 'offers', typ: u(undefined, a(r('Offer'))) },
  ], false),
  SaleInfoListPrice: o([
    { json: 'amount', js: 'amount', typ: 3.14 },
    { json: 'currencyCode', js: 'currencyCode', typ: '' },
  ], false),
  Offer: o([
    { json: 'finskyOfferType', js: 'finskyOfferType', typ: 0 },
    { json: 'listPrice', js: 'listPrice', typ: r('OfferListPrice') },
    { json: 'retailPrice', js: 'retailPrice', typ: r('OfferListPrice') },
    { json: 'giftable', js: 'giftable', typ: true },
  ], false),
  OfferListPrice: o([
    { json: 'amountInMicros', js: 'amountInMicros', typ: 0 },
    { json: 'currencyCode', js: 'currencyCode', typ: '' },
  ], false),
  SearchInfo: o([
    { json: 'textSnippet', js: 'textSnippet', typ: '' },
  ], false),
  VolumeInfo: o([
    { json: 'title', js: 'title', typ: '' },
    { json: 'authors', js: 'authors', typ: a('') },
    { json: 'publisher', js: 'publisher', typ: '' },
    { json: 'publishedDate', js: 'publishedDate', typ: '' },
    { json: 'description', js: 'description', typ: u(undefined, '') },
    { json: 'industryIdentifiers', js: 'industryIdentifiers', typ: a(r('IndustryIdentifier')) },
    { json: 'readingModes', js: 'readingModes', typ: r('ReadingModes') },
    { json: 'pageCount', js: 'pageCount', typ: 0 },
    { json: 'printType', js: 'printType', typ: r('PrintType') },
    { json: 'categories', js: 'categories', typ: a(r('Category')) },
    { json: 'maturityRating', js: 'maturityRating', typ: r('MaturityRating') },
    { json: 'allowAnonLogging', js: 'allowAnonLogging', typ: true },
    { json: 'contentVersion', js: 'contentVersion', typ: '' },
    { json: 'panelizationSummary', js: 'panelizationSummary', typ: u(undefined, r('PanelizationSummary')) },
    { json: 'imageLinks', js: 'imageLinks', typ: r('ImageLinks') },
    { json: 'language', js: 'language', typ: r('Language') },
    { json: 'previewLink', js: 'previewLink', typ: '' },
    { json: 'infoLink', js: 'infoLink', typ: '' },
    { json: 'canonicalVolumeLink', js: 'canonicalVolumeLink', typ: '' },
    { json: 'averageRating', js: 'averageRating', typ: u(undefined, 3.14) },
    { json: 'ratingsCount', js: 'ratingsCount', typ: u(undefined, 0) },
  ], false),
  ImageLinks: o([
    { json: 'smallThumbnail', js: 'smallThumbnail', typ: '' },
    { json: 'thumbnail', js: 'thumbnail', typ: '' },
  ], false),
  IndustryIdentifier: o([
    { json: 'type', js: 'type', typ: r('Type') },
    { json: 'identifier', js: 'identifier', typ: '' },
  ], false),
  PanelizationSummary: o([
    { json: 'containsEpubBubbles', js: 'containsEpubBubbles', typ: true },
    { json: 'containsImageBubbles', js: 'containsImageBubbles', typ: true },
  ], false),
  ReadingModes: o([
    { json: 'text', js: 'text', typ: true },
    { json: 'image', js: 'image', typ: true },
  ], false),
  AccessViewStatus: [
    'SAMPLE',
  ],
  Country: [
    'DE',
  ],
  TextToSpeechPermission: [
    'ALLOWED',
    'ALLOWED_FOR_ACCESSIBILITY',
  ],
  Viewability: [
    'PARTIAL',
  ],
  Kind: [
    'books#volume',
  ],
  Saleability: [
    'FOR_SALE',
    'NOT_FOR_SALE',
  ],
  Category: [
    'China',
    'History',
    'Juvenile Nonfiction',
  ],
  Type: [
    'ISBN_10',
    'ISBN_13',
  ],
  Language: [
    'en',
  ],
  MaturityRating: [
    'NOT_MATURE',
  ],
  PrintType: [
    'BOOK',
  ],
};
