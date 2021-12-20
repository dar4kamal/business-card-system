import {
  IsUrl,
  IsArray,
  Matches,
  IsString,
  IsOptional,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { SocialLink } from '../user.schema';
import { emailRegex } from '../../utility/regex';

export default class CreateUserDTO {
  @IsNotEmpty({ message: 'name must not be empty' })
  @IsString({ message: 'name must be a valid string' })
  name: string;

  @IsNotEmpty({ message: 'email must not be empty' })
  @Matches(emailRegex, { message: 'email must be a valid email' })
  email: string;

  @IsArray({ message: 'At least one address is required' })
  @Type(() => String)
  address: string[];

  @IsUrl({ message: 'image Url is required' })
  imageUrl: string;

  @IsArray({ message: 'At least one telephone contact is required' })
  @Type(() => String)
  tel: string[];

  @IsArray()
  @IsOptional()
  @Type(() => String)
  fax: string[];

  @IsArray({ message: 'At least one social contact is required' })
  @ValidateNested({ each: true })
  @Type(() => SocialLink)
  social: SocialLink[];
}
