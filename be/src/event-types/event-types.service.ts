import { Injectable } from '@nestjs/common';
import { AdsPermissionService } from '../ads-permission/ads-permission.service';

@Injectable()
export class EventTypesService {
  constructor(private readonly adsPermissionService: AdsPermissionService) {}
  async findAll(countryCode: string) {
    const eventTypes = ['crosspromo', 'liveops', 'app'];

    const { adsAllowed } =
      await this.adsPermissionService.getAdsPermission(countryCode);

    if (adsAllowed) {
      eventTypes.push('ads');
    }

    return eventTypes;
  }
}
