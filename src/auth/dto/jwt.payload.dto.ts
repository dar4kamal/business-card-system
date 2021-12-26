import { IsNotEmpty, Matches } from 'class-validator';

import { emailRegex } from '../../utility/regex';

export class JwtPayloadDTO {
  @IsNotEmpty({ message: 'email is required' })
  @Matches(emailRegex, { message: 'email must be valid' })
  email: string;
}
