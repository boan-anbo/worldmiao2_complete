import {Book, BookDataType, BookProvider} from "@/entities/book.entity";

export interface ScrapingCenterSuccessResponse {
    bookDataType: BookDataType,
    count: number,
    data: Book[],
    isCacheData: boolean;
    provider: BookProvider;
}
