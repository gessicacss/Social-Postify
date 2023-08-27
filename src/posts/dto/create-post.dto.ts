import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty({ message: 'Field should not be empty!' })
  title: string;

  @IsString()
  @IsNotEmpty({ message: 'Field should not be empty!' })
  text: string;

  @IsString()
  @IsOptional()
  @IsUrl()
  image?: string;
}
