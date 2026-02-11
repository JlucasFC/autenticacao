import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from '../companies/entities/company.entity';
import { Repository } from 'typeorm';
import { HashingService } from './hashing/hashing.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
    private readonly hashingService: HashingService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.companyRepository.findOneBy({
      email: loginDto.email,
    });

    console.log(loginDto.passowrd);

    if (!user) throw new UnauthorizedException('E-mail ou senha invalida');

    const passowrdIsValid = await this.hashingService.compare(
      loginDto.passowrd,
      user.passowrd,
    );

    if (!passowrdIsValid)
      throw new UnauthorizedException('E-mail ou senha invalida');

    return this.createToken(user);
  }

  async createToken(user: Company) {
    const jwtToken = this.jwtService.signAsync(
      { sub: user.id },
      { secret: this.configService.get('JWT_SECRET') },
    );
    return jwtToken;
  }
}
