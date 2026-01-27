import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './events/events.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
