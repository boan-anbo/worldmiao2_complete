import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule } from '@nestjs/common';
import { PuppeteerModule } from 'nest-puppeteer';
import { MemoryOfTheWorldService } from './memory-of-the-world.service';

describe('MemoryOfTheWorldService', () => {
  let service: MemoryOfTheWorldService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, PuppeteerModule],
      providers: [MemoryOfTheWorldService],
    }).compile();

    service = module.get<MemoryOfTheWorldService>(MemoryOfTheWorldService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
