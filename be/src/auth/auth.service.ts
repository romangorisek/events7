import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IpApiService } from '../ip-api/ip-api.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly ipApiService: IpApiService,
  ) {}

  async login(ip: string) {
    const countryCode = await this.ipApiService.getCountryCode(ip);
    const payload = { ip, countryCode };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
