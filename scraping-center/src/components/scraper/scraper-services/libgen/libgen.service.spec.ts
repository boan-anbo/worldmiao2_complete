import { Test, TestingModule } from '@nestjs/testing';
import { LibgenService } from './libgen.service';

describe('LibgenService', () => {
  let service: LibgenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LibgenService],
    }).compile();

    service = module.get<LibgenService>(LibgenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
