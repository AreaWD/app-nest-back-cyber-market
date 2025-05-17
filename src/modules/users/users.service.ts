import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../db/entities/user.entity';
import { Repository } from 'typeorm';
import * as argon2 from "argon2";

@Injectable()
export class UsersService {
    constructor(
      @InjectRepository(User)
      private readonly userRepository: Repository<User>
    ) {}
    async findOne(email: string) {
        return this.userRepository.findOne({
            where: {
                email: email
            }
        });
    }

    async create(createUserDto: CreateUserDto) {
        const existUser = await this.userRepository.findOne({
            where: {
                email: createUserDto.email,
            }
        })

        if (existUser) {
            throw new BadRequestException('this email already exist!')
        }

        const user = await this.userRepository.save({
            email: createUserDto.email,
            password: await argon2.hash(createUserDto.password)
        })

        return { user }
    }
}
