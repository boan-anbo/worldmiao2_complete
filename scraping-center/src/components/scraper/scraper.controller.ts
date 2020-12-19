import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import SuccessResponse from '@responses/success.response';
import { CacheService } from '@components/scraper/cache/cache.service';
import { BookAccess, BookDataType, BookProvider } from '@components/scraper/entities/book.entity';
import ServerErrorResponse from '@responses/server-error.response';
import ScraperService from './scraper.service';

@ApiTags('Scraper')
@Controller('scraper')
export default class ScraperController {
  constructor(private readonly ss: ScraperService,
    private readonly cs: CacheService) {}

  @Post('access')
  async fetchBook(@Body() query: {uniqueId: string, provider: BookProvider}) {
    const { uniqueId, provider } = query;

    // check if there is a cheche.
    const cacheResult = await this.cs.checkBookAccessCache(uniqueId, provider);
    if (cacheResult) {
      return new SuccessResponse(BookDataType.BOOK_ACCESS, cacheResult, provider, true);
    }

    let newResult: BookAccess[] | null;

    switch (provider) {
    case BookProvider.OPEN_LIBRARY:
      newResult = await this.ss.fetchAccessFromOpenLibrary(uniqueId);
      break;
    case BookProvider.WORLD_CAT:
      newResult = await this.ss.fetchAccessFromWorlcat(uniqueId);
      break;
    default:
      return new ServerErrorResponse('Invalid Fetch Request');
    }

    this.cs.saveBookAccessCache(uniqueId, provider, newResult);

    return new SuccessResponse(BookDataType.BOOK_ACCESS, newResult, provider, false);
  }

  @Post('test')
  async developService(@Body() query: { title: string, provider: BookProvider }) {
    const { title, provider } = query;
    return this.ss.searchZLibrary(title);
  }

  @Post()
  async searchEntrance(@Body() query: { title: string, provider: BookProvider }): Promise<SuccessResponse | ServerErrorResponse> {
    // WARNING THIS WILL DELETE ALL REDIS CACHE
    const FLUSH_MODE = false;

    const { provider } = query;
    const title = query.title?.trim();

    if (!title || !provider || title?.length <= 3) {
      return new ServerErrorResponse('No Title or Provider');
    }

    if (FLUSH_MODE) {
      await this.cs.flushAllBooks();
    }
    // check if there is a cheche.
    const cacheResult = await this.cs.checkBooksCache(title, provider);
    if (cacheResult) {
      return new SuccessResponse(BookDataType.BOOKS, cacheResult, provider, true);
    }

    let newData = [];
    switch (provider) {
    case BookProvider.GOOGLE_BOOKS:
      newData = await this.ss.searchGoogleBooks(title);
      break;
    case BookProvider.LIBRARY_GENESIS:
      newData = await this.ss.searchLibgen(title);
      break;
    case BookProvider.MEMORY_OF_THE_WORLD:
      newData = await this.ss.searchMemoryOfTheWorld(title);
      break;
    case BookProvider.ZLIBRARY:
      newData = await this.ss.searchZLibrary(title);
      break;
    case BookProvider.OPEN_LIBRARY:
      newData = await this.ss.searchOpenlibrary(title);
      break;
    case BookProvider.WORLD_CAT:
      newData = await this.ss.searchWorldCat(title);
      break;
    default:
      return new ServerErrorResponse('Invalid Request');
    }

    // cache new data
    this.cs.saveBooksCache(title, provider, newData);

    return new SuccessResponse(
      BookDataType.BOOKS,
      newData,
      provider,
      false,
    );
  }
}
