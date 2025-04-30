import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as argon2 from 'argon2';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../db/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string) {
    console.log('here');
    const user = await this.userRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password']
    });

    if (!user || !user.password) {
      return null;
    }

    try {
      const passwordIsMatch = await argon2.verify(user.password, password);
      return passwordIsMatch ? user : null;
    } catch {
      throw new UnauthorizedException('User or password are incorrect');
    }
  }

  async login(user: User) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
