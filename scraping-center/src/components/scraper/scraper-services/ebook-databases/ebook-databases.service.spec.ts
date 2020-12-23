import { Test, TestingModule } from '@nestjs/testing';
import { EbookDatabasesService } from './ebook-databases.service';

describe('EbookDatabasesService', () => {
  let service: EbookDatabasesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EbookDatabasesService],
    }).compile();

    service = module.get<EbookDatabasesService>(EbookDatabasesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
