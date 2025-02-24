import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, IsNumber } from 'class-validator';

export class CreatePassengerDto {
  @ApiProperty({ example: 'Jane Doe', description: 'Nombre del pasajero' })
  @IsString()
  name: string;

  @ApiProperty({
    example: { type: 'Point', coordinates: [-69.9, 18.5] },
    description: 'Ubicación del pasajero',
  })
  @IsArray()
  location: {
    type: string;
    coordinates: number[];
  };
}
