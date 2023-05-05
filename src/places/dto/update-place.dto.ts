import { Exclude } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class UpdatePlaceDto {
  @Exclude()
  country: string;

  @IsNotEmpty()
  local: string;

  @IsNotEmpty()
  meta: Date;

  @Exclude()
  flagUrl: string;
}
