import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule } from '@nestjs/common';
import { OpenlibraryService } from './openlibrary.service';

describe('OpenlibraryService', () => {
  let service: OpenlibraryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [OpenlibraryService],
    }).compile();

    service = module.get<OpenlibraryService>(OpenlibraryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
