import { IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { LocationDto } from '../../drivers/dto/location.dto';

export class CreatePassengerDto {
  @IsString()
  name: string;

  @ValidateNested()
  @Type(() => LocationDto)
  location: LocationDto;
}