import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class IpApiService {
  constructor(private readonly httpService: HttpService) {}

  private ipIsValid(ip: string): boolean {
    if (ip === '') return false;
    console.log('what is the ip???', ip);
    return false; // TODO: remove / handle...
    return true;
  }

  async getCountryCode(ip: string): Promise<string> {
    try {
      if (!this.ipIsValid(ip)) {
        return 'N/A';
      }

      const url = `http://ip-api.com/json/${ip}?fields=status,countryCode`;
      const res: { data: { status: string; countryCode: string } } =
        await firstValueFrom(this.httpService.get(url));

      if (res.data.status !== 'success') {
        console.error('Failed to get country code from IP');
        throw new InternalServerErrorException(
          'Failed to get country code from IP',
        );
      }

      return res.data.countryCode;
    } catch {
      console.error('Failed to get country code from IP');
      throw new InternalServerErrorException(
        'Failed to get country code from IP',
      );
    }
  }
}
