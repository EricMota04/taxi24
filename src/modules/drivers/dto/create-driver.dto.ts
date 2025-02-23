import { IsString, IsBoolean, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class LocationDto {
  @IsNumber()
  lat: number;

  @IsNumber()
  lng: number;
}

export class CreateDriverDto {
  @IsString()
  name: string;

  @ValidateNested()
  @Type(() => LocationDto)
  location: LocationDto;

  @IsBoolean()
  available: boolean;
}
