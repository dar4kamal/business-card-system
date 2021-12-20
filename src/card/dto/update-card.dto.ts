import { IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';
import { emailRegex } from '../../utility/regex';

export default class UpdateCardDTO {
  @IsOptional()
  @IsNotEmpty({ message: 'title is required' })
  @IsString({ message: 'title must be a valid text' })
  title: string;

  @IsOptional()
  @IsNotEmpty({ message: 'company name is required' })
  @IsString({ message: 'company name must be a valid text' })
  company: string;

  @IsOptional()
  @IsNotEmpty({ message: 'email is required' })
  @Matches(emailRegex, { message: 'email must be a valid email' })
  email: string;
}
