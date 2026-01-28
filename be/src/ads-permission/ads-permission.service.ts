import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AdsPermissionService {
  constructor(private readonly httpService: HttpService) {}

  async getAdsPermission(countryCode: string): Promise<{ adsAlowed: boolean }> {
    const url = `https://europe-west1-o7tools.cloudfunctions.net/fun7-ad-partner-expertise-test?countryCode=${countryCode}`;
    const username = 'fun7user';
    const password = 'fun7pass';
    const b64 = Buffer.from(`${username}:${password}`).toString('base64');
    const res: { data: { ads: string } } = await firstValueFrom(
      this.httpService.get(url, {
        headers: {
          Authorization: `Basic ${b64}`,
        },
      }),
    );
    return { adsAlowed: res.data.ads === 'sure, why not!' };
  }
}
