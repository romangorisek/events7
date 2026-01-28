import { Injectable } from '@nestjs/common';

@Injectable()
export class EventTypesService {
  findAll() {
    const eventTypes = [
      { label: 'crosspromo', value: 'crosspromo', color: 'grey-6' },
      { label: 'liveops', value: 'liveops', color: 'green' },
      { label: 'app', value: 'app', color: 'yellow' },
    ];

    const hasAdsPermission = false;
    if (hasAdsPermission) {
      eventTypes.push({ label: 'ads', value: 'ads', color: 'red' });
    }

    return eventTypes;
  }
}
