import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreatePlaceDto {
  @IsNotEmpty()
  @IsString()
  country: string;

  @IsNotEmpty()
  local: string;

  @IsNotEmpty()
  @IsDate()
  meta: Date;

  flagUrl: string;
}
