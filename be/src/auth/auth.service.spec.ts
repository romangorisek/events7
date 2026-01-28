/* eslint-disable @typescript-eslint/unbound-method */

import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { IpApiService } from '../ip-api/ip-api.service';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;
  let ipApiService: IpApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(() => 'test_token'),
          },
        },
        {
          provide: IpApiService,
          useValue: {
            getCountryCode: jest.fn(() => 'US'),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
    ipApiService = module.get<IpApiService>(IpApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an access token on login', async () => {
    const ip = '127.0.0.1';
    const countryCode = 'US';
    const expectedToken = 'test_token';

    (ipApiService.getCountryCode as jest.Mock).mockResolvedValue(countryCode);
    (jwtService.sign as jest.Mock).mockReturnValue(expectedToken);

    const result = await service.login(ip);

    expect(ipApiService.getCountryCode).toHaveBeenCalledWith(ip);
    expect(jwtService.sign).toHaveBeenCalledWith({ ip, countryCode });
    expect(result).toEqual({ access_token: expectedToken });
  });
});
