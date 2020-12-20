import {Book, BookProvider} from "@/entities/book.entity";

export type SearchStore  = Record<BookProvider, SearchStatus>

export class BookShelfBox {

    bookCoverShown = true // the default value determines whether cover is down in the beginning
    book = new Book(null)
}

export type BookShelf = Record<BookProvider, BookShelfBox[]>

export class SearchStatus {
    set searchingStatus(value: LibrarySearchStatus) {
        switch(value) {
            case LibrarySearchStatus.ERROR:
                this.stopTimer()
                break;
            case LibrarySearchStatus.SEARCHING:
                this.resetTimer()
                this.startTimer()
                break;
            case LibrarySearchStatus.SEARCH_FINISHED:
                this.stopTimer()
                break;
        }
        this._searchingStatus = value;
    }
    setSearchedTerm(term: string) {
        this.searchedTerm = term;
    }
    getSearchedTerm(): string {
        return this.searchedTerm
    }
    searchedTerm: string = ''
    searchResultCount: number | null = null;
    provider: BookProvider
    private _searchingStatus: LibrarySearchStatus = LibrarySearchStatus.IDLE
    private intervalTimer: number = 0;
    searchTimer: number = 0;
    constructor(provider: BookProvider) {
        this.provider = provider
    }

    getTimerValue() {
        return (this.searchTimer / 10).toFixed(1);
    }

    getCurrentStatus() {
        return this._searchingStatus
    }

    setSearchResultCount(count: number) {
        console.log('hit', count)
        if (typeof count === 'number') {
            this.searchResultCount = count
        }
    }

    getSearchResultCount() {
        if (this.searchResultCount !== undefined) {
            return this.searchResultCount
        }
    }
    setSearchStatus(status: LibrarySearchStatus) {
        this.searchingStatus = status
    }
    startTimer() {
        this.intervalTimer = setInterval(() => {this.searchTimer++}, 100)
    }

    stopTimer() {
        clearInterval(this.intervalTimer)
    }

    resetTimer() {
        this.stopTimer()
        this.searchTimer = 0;
    }
}

export enum LibrarySearchStatus {
    SEARCH_FINISHED = "done.",
    IDLE = 'ready.',
    SEARCHING = 'searching...',
    ERROR = 'error.'
}
