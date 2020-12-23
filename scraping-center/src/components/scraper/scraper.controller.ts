import {
  Body, Controller, Get, Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import SuccessResponse from '@responses/success.response';
import { CacheService } from '@components/scraper/cache/cache.service';
import {
  BookAccess, BookAccessType, BookDataType, BookProvider,
} from '@components/scraper/entities/book.model';
import ServerErrorResponse from '@responses/server-error.response';
import BookEntity from '@components/scraper/entities/bookEntity.entity';
import { getManager } from 'typeorm';
import * as fs from 'fs';
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

  @Post('scraper/test')
  async developService(@Body() query: { title: string, provider: BookProvider }) {
    // const { title, provider } = query;
    // return this.ss.searchZLibrary(title);
  }

  // @Post('search')
  // async searchTitle(@Body() query: {title: string}) {
  //
  // }

  @Get('automate')
  async automate() {
    return;
    fs.readFile('C:\\Users\\Bo\\PycharmProjects\\mark_record_reader\\data.json', 'utf8', async (err, jsonString) => {
      if (err) {
        console.log('File read failed:', err);
        return;
      }

      // const result = JSON.parse(jsonString).filter((item: Book) => !(item.access?.length > 0));
      const result: Partial<BookEntity>[] = JSON.parse(jsonString);
      const entityManager = getManager();
      let counter = 0;
      let emptycounter = 0;

      const allEntitiesToAdd = [];
      for (let i = 0; i < result.length; i++) {
        const bookEntity = result[i];
        counter += 1;
        // console.log(bookEntity)
        if (!(counter >= 300000 && counter < 400000)) {
          continue;
        }

        if (bookEntity.access?.find((access) => !access.link)) {
          emptycounter += 1;
          continue;
        }
        const entity = new BookEntity({ provider: BookProvider.WORLD_CAT, ...bookEntity });
        entity.access = entity.access.map((access) => {
          access.type = BookAccessType.DATABASE;
          if (!access.name) {
            access.name = '';
          }
          return access;
        });
        allEntitiesToAdd.push(entity);
      }
      console.log('valid records', counter);
      console.log('empty records', emptycounter);

      const res = await entityManager.save([...allEntitiesToAdd], { chunk: 1000 });
      console.log(res);

      //
      // // const result: Book[] = JSON.parse(jsonString).filter((item: Book) => item.author === null);
      // console.log('Record total', result.length)
      //
      // const set = new Set();
      // result.forEach((book: Book) => {
      //   // @ts-ignore
      //   if (!set.has(book.filename)) {
      //     // @ts-ignore
      //     set.add(book.filename)
      //   }

      // })

      // set.forEach(i => console.log('File data:', i))
    });
  }


  @Post('suggestion')
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
      newData = await this.ss.searchWorldCat(title);
      break;
    default:
      return new ServerErrorResponse('Invalid Request');
    }

    const dataLength = newData?.length;

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
