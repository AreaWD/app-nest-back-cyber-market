import { IsEmail, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    uniqueItems: true,
    example: 'example@test.com'
  })
  @IsEmail()
  email: string

  @ApiProperty()
  @MinLength(6, { message: 'Password must the more then 6 symbols' })
  password: string

}