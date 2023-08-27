import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMediaDto {
  @IsString()
  @IsNotEmpty({ message: 'Field should not be empty!' })
  title: string;

  @IsString()
  @IsNotEmpty({ message: 'Field should not be empty!' })
  username: string;
}
