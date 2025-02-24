import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsArray, IsNumber } from 'class-validator';

export class CreateDriverDto {
  @ApiProperty({ example: 'John Doe', description: 'Nombre del conductor' })
  @IsString()
  name: string;

  @ApiProperty({
    example: { type: 'Point', coordinates: [-69.9, 18.5] },
    description: 'Ubicación del conductor',
  })
  @IsArray()
  location: {
    type: string;
    coordinates: number[];
  };

  @ApiProperty({ example: true, description: 'Disponibilidad del conductor' })
  @IsBoolean()
  available: boolean;
}
