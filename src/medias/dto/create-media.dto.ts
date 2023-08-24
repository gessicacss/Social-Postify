import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateMediaDto {
  @IsString()
  @IsNotEmpty({ message: 'Field should not be empty!' })
  title: string;

  @IsUrl()
  @IsNotEmpty({ message: 'Field should not be empty!' })
  username: string;
}
