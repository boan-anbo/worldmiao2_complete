import { Injectable } from '@nestjs/common';
import { LibgenService } from '@components/scraper/scraper-services/libgen/libgen.service';
import { OpenlibraryService } from '@components/scraper/scraper-services/openlibrary/openlibrary.service';
import { GoogleBooksService } from '@components/scraper/scraper-services/google-books/google-books.service';
import { WorldcatService } from '@components/scraper/scraper-services/worldcat/worldcat.service';
import { MemoryOfTheWorldService } from '@components/scraper/scraper-services/memory-of-the-world/memory-of-the-world.service';
import {BookAccess, BookProvider} from '@components/scraper/entities/book.model';
import { ZlibraryService } from '@components/scraper/scraper-services/zlibrary/zlibrary.service';
import {EbookDatabasesService} from "@components/scraper/scraper-services/ebook-databases/ebook-databases.service";
import {SuggestionService} from "@components/scraper/scraper-services/suggestion/suggestion.service";

const { promisify } = require('util')

const sleep = promisify(setTimeout)

@Injectable()
export default class ScraperService {
  constructor(
    private libgenService: LibgenService,
    private openLibraryService: OpenlibraryService,
    private googleBooksService: GoogleBooksService,
    private worldcatService: WorldcatService,
    private zlibraryService: ZlibraryService,
    private memoryOfTheWorld: MemoryOfTheWorldService,
    private ebookDatabaseService: EbookDatabasesService,
    private suggestionService: SuggestionService
  ) {
  }

  public async testScraper(): Promise<string> {
    return 'test Success';
  }

  public async searchLibgen(title: string) {
    return this.libgenService.searchLibGen(title);
  }

  async searchOpenlibrary(title: string) {
    return this.openLibraryService.search(title);
  }

  async searchGoogleBooks(title: string) {
    const result = await this.googleBooksService.search(title);
    return result;
  }

  async searchDatabase(query: string, provider: BookProvider) {
    // const result = await this.worldcatService.searchBooks(title);
    const result = this.ebookDatabaseService.search(query, provider);
    return result;
  }

  async searchMemoryOfTheWorld(title: string) {
    const result = await this.memoryOfTheWorld.search(title);
    return result;
  }

  async fetchAccessFromOpenLibrary(uniqueId: string): Promise<BookAccess[] | null> {
    return this.openLibraryService.fetchBook(uniqueId);
  }

  async fetchAccessFromWorlcat(uniqueId: string): Promise<BookAccess[] | null> {

    let allEditions = await this.worldcatService.getAllEditionIds(uniqueId);
    console.log(allEditions)
    if (allEditions?.length > 2) {
      allEditions = allEditions.slice(0, 2);
    }
    const allResults: BookAccess[] = [];

    for await (const editionWorldcatId of allEditions) {
      const oneEditionResults = await this.worldcatService.getAvailableDatabases(editionWorldcatId);
      await sleep(1500);
      oneEditionResults.forEach((access) => allResults.push(access));
    }


    if (allResults) {
      const uniqueResults: BookAccess[] = [];
      allResults.forEach((oneInAll) => {
        const exists = uniqueResults.find((uniqueOne) => uniqueOne.name === oneInAll.name);
        if (!exists) {
          uniqueResults.push(oneInAll);
        }
      });
      return uniqueResults;
    }
    return null;
  }

  async searchZLibrary(title: string) {
    return this.zlibraryService.search(title);
  }


  async getAllSuggestions() {
    return this.suggestionService.getAllSuggestions()
  }
}
