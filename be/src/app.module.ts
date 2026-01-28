import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './events/events.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { EventTypesModule } from './event-types/event-types.module';
import { AdsPermissionModule } from './ads-permission/ads-permission.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    EventsModule,
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: 'data/db.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      // CRITICAL: Set synchronize to false in production
      synchronize: process.env.NODE_ENV !== 'production',
      prepareDatabase: (db) => {
        db.pragma('journal_mode = WAL'); // Enable Write-Ahead Logging for better concurrency
        db.pragma('synchronous = NORMAL');
      },
    }),
    EventTypesModule,
    AdsPermissionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
