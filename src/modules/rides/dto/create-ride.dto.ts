import { IsString, IsMongoId } from 'class-validator';

export class CreateRideDto {
  @IsMongoId()
  driver: string;

  @IsMongoId()
  passenger: string;

  @IsString()
  status: string; // 'active' | 'completed'
}