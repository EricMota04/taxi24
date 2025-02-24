import { IsString, IsMongoId } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRideDto {
    @ApiProperty({ example: '60d0fe4f5311236168a109ca', description: 'ID del conductor' })
    @IsMongoId()
    driver: string;
    
    @ApiProperty({ example: '60d0fe4f5311236168a109cb', description: 'ID del pasajero' })
    @IsMongoId()
    passenger: string;
    
    @ApiProperty({ example: 'active', description: 'Estado del viaje (active o completed)' })
    @IsString()
    status: string;
}
    