import { Injectable } from '@nestjs/common';
import { AdsPermissionService } from '../ads-permission/ads-permission.service';

@Injectable()
export class EventTypesService {
  constructor(private readonly adsPermissionService: AdsPermissionService) {}
  async findAll(countryCode: string) {
    const eventTypes = [
      { label: 'crosspromo', value: 'crosspromo', color: 'grey-6' },
      { label: 'liveops', value: 'liveops', color: 'green' },
      { label: 'app', value: 'app', color: 'yellow' },
    ];

    const { adsAllowed } =
      await this.adsPermissionService.getAdsPermission(countryCode);

    if (adsAllowed) {
      eventTypes.push({ label: 'ads', value: 'ads', color: 'red' });
    }

    return eventTypes;
  }
}
