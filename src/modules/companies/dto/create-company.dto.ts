import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  name: string;

  @IsStrongPassword()
  passowrd: string;

  @IsEmail()
  email: string;
}
