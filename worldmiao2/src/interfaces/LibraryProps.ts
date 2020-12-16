import {BookProvider} from "@/entities/book.entity";
import {BookStore} from "@/interfaces/AppProps";
import {ScrapingCenterSuccessResponse} from "@/interfaces/ScrapingCenterSuccessResponse";

export interface LibraryProps {
    libraryName: string,
    bookProvider: BookProvider
    bookStore: BookStore
    colIsEven: Boolean,
}
