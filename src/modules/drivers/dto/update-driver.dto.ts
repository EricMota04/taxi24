import { PartialType } from '@nestjs/mapped-types';
import { CreateDriverDto } from './create-driver.dto';
import { LocationDto } from './location.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateDriverDto extends PartialType(CreateDriverDto) {
  @ApiPropertyOptional({ type: LocationDto, description: 'Nueva ubicación del conductor' })
  location?: LocationDto;
}
