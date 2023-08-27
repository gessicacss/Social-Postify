import { IsDateString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePublicationDto {
  @IsNumber()
  @IsNotEmpty({ message: 'Field should not be empty!' })
  mediaId: number;

  @IsNumber()
  @IsNotEmpty({ message: 'Field should not be empty!' })
  postId: number;

  @IsDateString()
  @IsNotEmpty({ message: 'Field should not be empty!' })
  date: string;
}
