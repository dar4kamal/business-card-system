import { IsNotEmpty, IsString } from 'class-validator';

export default class CreateCardDTO {
  @IsNotEmpty({ message: 'title is required' })
  @IsString({ message: 'title must be a valid text' })
  title: string;

  @IsNotEmpty({ message: 'company name is required' })
  @IsString({ message: 'company name must be a valid text' })
  company: string;
}
