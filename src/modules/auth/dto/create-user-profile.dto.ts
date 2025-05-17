import { IsString, IsInt, IsDate, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserProfileDto {

  @ApiProperty({ description: 'The first name of the user' })
  @IsString()
  FirstName: string;

  @ApiProperty({ description: 'The last name of the user' })
  @IsString()
  LastName: string;

  @ApiProperty({ description: 'The phone number of the user' })
  @IsString()
  Phone: string;

  @ApiProperty({ description: 'The birth date of the user' })
  @IsString()
  BirthDate: string;

  @ApiProperty({ description: 'The gender of the user' })
  @IsString()
  Gender: string;
}
