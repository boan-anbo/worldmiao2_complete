import {HttpModule, Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';

import {LibgenService} from '@components/scraper/scraper-services/libgen/libgen.service';
import {OpenlibraryService} from '@components/scraper/scraper-services/openlibrary/openlibrary.service';
import {GoogleBooksService} from '@components/scraper/scraper-services/google-books/google-books.service';
import {WorldcatService} from '@components/scraper/scraper-services/worldcat/worldcat.service';
import {MemoryOfTheWorldService} from '@components/scraper/scraper-services/memory-of-the-world/memory-of-the-world.service';
import {CacheService} from '@components/scraper/cache/cache.service';
import {ZlibraryService} from '@components/scraper/scraper-services/zlibrary/zlibrary.service';
import ScraperController from './scraper.controller';
import ScraperService from './scraper.service';
import BookEntity from "@components/scraper/entities/bookEntity.entity";
import BookAccessEntity from "@components/scraper/entities/bookAccessEntity.entity";
import UniqueIdEntity from "@components/scraper/entities/bookUniqueId.entity";

@Module({
  imports: [TypeOrmModule.forFeature([BookEntity, BookAccessEntity, UniqueIdEntity]), HttpModule],
  controllers: [ScraperController],
  providers: [
    ScraperService,
    LibgenService,
    OpenlibraryService,
    GoogleBooksService,
    WorldcatService,
    // MemoryOfTheWorldService,
    CacheService,
    ZlibraryService,
    MemoryOfTheWorldService,
  ],
  exports: [ScraperService],
})
export default class ScraperModule {}
