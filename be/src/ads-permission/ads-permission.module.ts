import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AdsPermissionService } from './ads-permission.service';

@Module({
  imports: [HttpModule],
  providers: [AdsPermissionService],
  exports: [AdsPermissionService],
})
export class AdsPermissionModule {}
