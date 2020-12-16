import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule, HttpService } from '@nestjs/common';
import { GoogleBooksService } from './google-books.service';

describe('GoogleBooksService', () => {
  let service: GoogleBooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [GoogleBooksService],
    }).compile();

    service = module.get<GoogleBooksService>(GoogleBooksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
