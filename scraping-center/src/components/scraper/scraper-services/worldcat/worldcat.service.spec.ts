import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule } from '@nestjs/common';
import { WorldcatService } from './worldcat.service';

describe('WorldcatService', () => {
  let service: WorldcatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [WorldcatService],
    }).compile();

    service = module.get<WorldcatService>(WorldcatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
