import { IsNotEmpty } from 'class-validator';

export class UpdatePlaceDto {
  @IsNotEmpty()
  local: string;

  @IsNotEmpty()
  meta: Date;
}
