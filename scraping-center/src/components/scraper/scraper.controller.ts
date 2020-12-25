import {
  Body, Controller, Get, Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import SuccessResponse from '@responses/success.response';
import { CacheService } from '@components/scraper/cache/cache.service';
import { BookAccess, BookDataType, BookProvider } from '@components/scraper/entities/book.model';
import ServerErrorResponse from '@responses/server-error.response';
import { SuggestionService } from '@components/scraper/scraper-services/suggestion/suggestion.service';
import ScraperService from './scraper.service';

@ApiTags('')
@Controller('')
export default class ScraperController {
  constructor(private readonly ss: ScraperService,
    private readonly cs: CacheService,
      private readonly suggestionService: SuggestionService) {}

  @Post('scraper/access')
  async fetchBook(@Body() query: {uniqueId: string, provider: BookProvider}) {
    const { uniqueId, provider } = query;

    // console.log('Received Request', query)

    // FLUSH MODE!!!! DEVELOPMENT ONLY
    const FLUSH_MODE = false;
    if (FLUSH_MODE) {
      await this.cs.flushAllBooks();
    }
    /// //

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

  // @Post('scraper/test')
  // async developService(@Body() query: { title: string, provider: BookProvider }) {
  // }
  //
  // @Get('automate')
  // async automate() {
  //   // ProcessProletariate();
  //   // ImportGutenberg()
  //
  //   ImportYaleCatalogue();
  //   const manager = getManager();
  //   const distinctBook: BookEntity [] = [];
  //
  //   const res = await manager.getRepository(BookEntity).find({ where: { provider: BookProvider.WORLD_CAT }, take: 50000, skip: 350000 });
  //   res.forEach((book) => {
  //     const existing: string[] = [];
  //     const originalLength = book.access.length;
  //     book.access = book.access.filter((access) => {
  //       if (existing.indexOf(access.link) === -1) {
  //         existing.push(access.link);
  //       }
  //     });
  //
  //     if (existing.length < originalLength) {
  //       distinctBook.push(book);
  //     }
  //   });
  //
  //   console.log(distinctBook.length);
  //
  //   const saveResult = await manager.save([...distinctBook], { chunk: 1000 });
  //   console.log('Result', saveResult);
  // console.log('preupdate result', distinctBook[1]);
  // for (let i = 0; i < distinctBook.length; i++) {
  //
  // }
  // const saveResult = await manager.getRepository(BookEntity).save(distinctBook[1]);
  // console.log('update result', saveResult);
  // }

  @Get('suggestion')
  async getSuggestion(@Body() query: { password: string }) {
    const { password } = query;
    if (password === 'mypass') {
      return this.suggestionService.getAllSuggestions();
    }
    return 'request invalid';
  }

  @Post('suggestion')
  async addSuggestion(@Body() query: { content: string }) {
    const { content } = query;
    if (content.length > 2) {
      return this.suggestionService.addOneSuggestion(query.content);
    }
  }

  @Post('scraper')
  async searchEntrance(@Body() query: { title: string, provider: BookProvider }): Promise<SuccessResponse | ServerErrorResponse> {
    // WARNING THIS WILL DELETE ALL REDIS CACHE
    // console.log("RECEIVEDREQUEST", query)
    const FLUSH_MODE = false;
    //---------------------------------------------

    const { provider } = query;
    const title = query.title?.trim();

    if (!title || !provider || title?.length < 2) {
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
      newData = await this.ss.searchDatabase(title, provider);
      break;
    case BookProvider.PROLETARIAT:
      newData = await this.ss.searchDatabase(title, provider);
      break;
    case BookProvider.GUTENBERG:
      newData = await this.ss.searchDatabase(title, provider);
      break;
    default:
      return new ServerErrorResponse('Invalid Request');
    }

    const dataLength = newData?.length;

    console.log('result count', dataLength);

    // save only 20 data entries
    if (newData?.length > 20) {
      newData = newData.slice(0, 20);
    }

    // cache new data
    this.cs.saveBooksCache(title, provider, newData);

    return new SuccessResponse(
      BookDataType.BOOKS,
      newData,
      provider,
      false,
      dataLength ?? null,
    );
  }
}
