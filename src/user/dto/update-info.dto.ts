import {
  IsUrl,
  Matches,
  IsArray,
  IsString,
  IsOptional,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { emailRegex, passwordRegex } from '../../utility/regex';

import { SocialLink } from '../user.schema';

export default class UpdateUserDTO {
  @IsOptional()
  @IsNotEmpty({ message: 'name must not be empty' })
  @IsString({ message: 'name must be a valid string' })
  name: string;

  @IsOptional()
  @IsNotEmpty({ message: 'email must not be empty' })
  @Matches(emailRegex, { message: 'email must be a valid email' })
  email: string;

  @IsOptional()
  @IsNotEmpty({ message: 'password can not be empty' })
  @Matches(passwordRegex, {
    message:
      'Password must be have at least [ 1 number, 1 uppercase letter, 1 lowercase letter ] and at least 8 characters long',
  })
  password: string;

  @IsOptional()
  @IsArray({ message: 'At least one address is required' })
  @Type(() => String)
  address: string[];

  @IsOptional()
  @IsUrl({ message: 'image Url is required' })
  imageUrl: string;

  @IsOptional()
  @IsArray({ message: 'At least one telephone contact is required' })
  @Type(() => String)
  tel: string[];

  @IsOptional()
  @IsArray()
  @Type(() => String)
  fax: string[];

  @IsOptional()
  @IsArray({ message: 'At least one social contact is required' })
  @ValidateNested({ each: true })
  @Type(() => SocialLink)
  social: SocialLink[];
}
