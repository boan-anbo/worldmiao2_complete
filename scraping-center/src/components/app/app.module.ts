import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisModule } from 'nestjs-redis';
import { ConfigModule } from '@nestjs/config';

import AuthModule from '@components/auth/auth.module';
import UsersModule from '@components/users/users.module';

import ScraperModule from '@components/scraper/scraper.module';
import { CacheService } from '@components/scraper/cache/cache.service';
import { PuppeteerModule } from 'nest-puppeteer';
import AppController from './app.controller';
import AppService from './app.service';
import { LoggerMiddleware } from '../../middleware/logger';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // PuppeteerModule.forRoot(
    //   { pipe: true }, // optional, any Puppeteer launch options here or leave empty for good defaults */,
    //   // 'BrowserInstanceName', // optional, can be useful for using Chrome and Firefox in the same project
    // ),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: process.env.MYSQL_PORT as unknown as number,
      database: process.env.MYSQL_DB,
      username: process.env.MYSQL_ROOT_USER,
      password: process.env.MYSQL_PASSWORD,
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    RedisModule.register({
      url: process.env.REDIS_URL,
      onClientReady: async (client): Promise<void> => {
        client.on('error', console.error);
        client.on('ready', () => {
          console.log('redis is running on 6379 port');
        });
        client.on('restart', () => {
          console.log('attempt to restart the redis server');
        });
      },
      reconnectOnError: (): boolean => true,
    }),
    AuthModule,
    UsersModule,
    ScraperModule,
  ],
  controllers: [AppController],
  providers: [AppService, CacheService],
})
export default class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
