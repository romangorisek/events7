import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class IpApiService {
  constructor(private readonly httpService: HttpService) {}

  private NO_COUNTRY_CODE = 'N/A';

  async getCountryCode(ip: string): Promise<string> {
    try {
      const url = `http://ip-api.com/json/${ip}?fields=status,countryCode`;
      const res: { data: { status: string; countryCode: string } } =
        await firstValueFrom(this.httpService.get(url));

      if (res.data.status !== 'success') {
        console.error(
          'Failed to get country code from IP, returning default value',
        );
        return this.NO_COUNTRY_CODE;
      }

      return res.data.countryCode;
    } catch {
      console.error(
        'Failed to get country code from IP, returning default value',
      );
      return this.NO_COUNTRY_CODE;
    }
  }
}
