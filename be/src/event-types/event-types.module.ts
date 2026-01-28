import { Module } from '@nestjs/common';
import { EventTypesService } from './event-types.service';
import { EventTypesController } from './event-types.controller';
import { AdsPermissionModule } from '../ads-permission/ads-permission.module';

@Module({
  imports: [AdsPermissionModule],
  controllers: [EventTypesController],
  providers: [EventTypesService],
})
export class EventTypesModule {}
