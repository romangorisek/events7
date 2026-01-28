import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { AdsPermissionModule } from '../ads-permission/ads-permission.module';

@Module({
  imports: [TypeOrmModule.forFeature([Event]), AdsPermissionModule],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
