import { IsString, IsNotEmpty, IsOptional, Matches } from 'class-validator';

import { UserRoles } from '../../utility/types';
import { emailRegex, passwordRegex } from '../../utility/regex';

export class AuthCredentialsDTO {
  @IsNotEmpty({ message: 'email is required' })
  @Matches(emailRegex, { message: 'email must be valid' })
  email: string;

  @IsNotEmpty({ message: 'password is required' })
  @Matches(passwordRegex, {
    message:
      'Password must be have at least [ 1 number, 1 uppercase letter, 1 lowercase letter ] and at least 8 characters long',
  })
  password: string;

  @IsOptional()
  @IsString({ message: 'role Must be a valid string' })
  @IsNotEmpty({ message: 'role is required' })
  role: UserRoles;
}
