import { ApiProperty } from '@nestjs/swagger';
import { Book, BookDataType, BookProvider } from '@components/scraper/entities/book.model';
import Data from './types/data.type';

export default class SuccessResponse {
  @ApiProperty({ type: Data })
  readonly data: Data | object | null = null;

  @ApiProperty({ type: Number })
  count: number | null = null;

  @ApiProperty({ type: BookProvider })
  provider: BookProvider | null = null;

  private isCacheData: boolean = false;

  private bookDataType: string | BookDataType = '';

  constructor(
    dataType: string | null | BookDataType = null,
    data: Data | object | null = null,
    provider?: BookProvider | null,
    isCacheData?: boolean,
    dataCount?: number | null,
  ) {
    if (dataType) {
      this.bookDataType = dataType;
    }
    if (data) {
      this.data = data;
      if (Array.isArray(data) && dataCount === null) {
        this.count = data.length;
      }
    }
    if (dataCount) {
      this.count = dataCount;
    }
    if (provider) {
      this.provider = provider;
    }
    if (isCacheData) {
      this.isCacheData = isCacheData;
    }
  }
}
