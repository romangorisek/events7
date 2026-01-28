import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config'; // Import ConfigService
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AdsPermissionService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService, // Inject ConfigService
  ) {}

  async getAdsPermission(countryCode: string): Promise<{ adsAlowed: boolean }> {
    const username = this.configService.get<string>('ADS_PERMISSION_USERNAME');
    const password = this.configService.get<string>('ADS_PERMISSION_PASSWORD');

    if (!username || !password) {
      // better way to test this on a real project would be with some validation service for .env that has to pass before the app even starts to avoid runtime errors
      console.error('ads permission api credetials missing in .env file');
      throw new Error('ads permission api credetials missing in .env file');
    }

    try {
      const url = `https://europe-west1-o7tools.cloudfunctions.net/fun7-ad-partner-expertise-test?countryCode=${countryCode}`;
      const b64 = Buffer.from(`${username}:${password}`).toString('base64');

      const res: { data: { ads: string } } = await firstValueFrom(
        this.httpService.get(url, {
          headers: {
            Authorization: `Basic ${b64}`,
          },
        }),
      );

      return { adsAlowed: res.data.ads === 'sure, why not!' };
    } catch {
      console.error(
        'getting ads permissions failed, returned false as default',
      );
      return { adsAlowed: false };
    }
  }
}
