import { Matches, IsNotEmpty } from 'class-validator';

import { passwordRegex } from '../../utility/regex';

export default class UpdateUserCredentialsDTO {
  @IsNotEmpty({ message: 'old password can not be empty' })
  oldPassword: string;

  @IsNotEmpty({ message: 'new password can not be empty' })
  @Matches(passwordRegex, {
    message:
      'Password must be have at least [ 1 number, 1 uppercase letter, 1 lowercase letter ] and at least 8 characters long',
  })
  newPassword: string;
}
