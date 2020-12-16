import {Book, BookProvider} from "@/entities/book.entity";
import {ScrapingCenterSuccessResponse} from "@/interfaces/ScrapingCenterSuccessResponse";

export interface AppProps {
    searchTerm: string

}

export type BookStore = Record<BookProvider, ScrapingCenterSuccessResponse>
