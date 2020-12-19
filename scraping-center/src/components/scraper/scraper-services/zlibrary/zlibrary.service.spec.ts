import { Test, TestingModule } from '@nestjs/testing';
import { ZlibraryService } from './zlibrary.service';

describe('ZlibraryService', () => {
  let service: ZlibraryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ZlibraryService],
    }).compile();

    service = module.get<ZlibraryService>(ZlibraryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
