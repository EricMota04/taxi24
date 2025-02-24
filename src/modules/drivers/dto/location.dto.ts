import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum, IsNumber } from 'class-validator';

export class LocationDto {
  @ApiProperty({ example: 'Point', description: 'Tipo de ubicación (GeoJSON)' })
  @IsEnum(['Point'])
  type: string;

  @ApiProperty({ example: [-69.9, 18.5], description: 'Coordenadas [longitud, latitud]' })
  @IsArray()
  @IsNumber({}, { each: true })
  coordinates: number[];
}
