import { Injectable } from '@nestjs/common';
import { LibgenService } from '@components/scraper/scraper-services/libgen/libgen.service';
import { OpenlibraryService } from '@components/scraper/scraper-services/openlibrary/openlibrary.service';
import { GoogleBooksService } from '@components/scraper/scraper-services/google-books/google-books.service';
import { WorldcatService } from '@components/scraper/scraper-services/worldcat/worldcat.service';
import { MemoryOfTheWorldService } from '@components/scraper/scraper-services/memory-of-the-world/memory-of-the-world.service';
import { BookAccess } from '@components/scraper/entities/book.entity';

@Injectable()
export default class ScraperService {
  constructor(
    private libgenService: LibgenService,
    private openLibraryService: OpenlibraryService,
    private googleBooksService: GoogleBooksService,
    private worldcatService: WorldcatService,
    // private memoryOfTheWorld: MemoryOfTheWorldService,
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

  async searchWorldCat(title: string) {
    const result = await this.worldcatService.searchBooks(title);
    return result;
  }

  async searchMemoryOfTheWorld(title: string) {
    // const result = await this.memoryOfTheWorld.search(title);
    return null;
  }

  async fetchAccessFromOpenLibrary(uniqueId: string): Promise<BookAccess[] | null> {
    return this.openLibraryService.fetchBook(uniqueId);
  }

  async fetchAccessFromWorlcat(uniqueId: string): Promise<BookAccess[] | null> {
    return this.worldcatService.getAvailableDatabases(uniqueId);
  }
}
