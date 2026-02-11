import { IsString, IsStrongPassword } from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  name: string;

  @IsStrongPassword()
  passowrd: string;
}
