import { Injectable } from '@nestjs/common';

@Injectable()
export default class AppService {
  // async openSwagger(): Promise<void> {
  //   const url = 'http://localhost:3000/api';
  //
  //   await open(url);
  // }

  getHello(): string {
    return 'last updated 24/12/21';
  }
}
