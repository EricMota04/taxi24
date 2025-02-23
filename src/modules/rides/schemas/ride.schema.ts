import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Driver } from '../../drivers/schemas/driver.schema';
import { Passenger } from '../../passengers/schemas/passenger.schema';
import { Types } from 'mongoose';

@Schema()
export class Ride extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Driver', required: true })
  driver: Driver;

  @Prop({ type: Types.ObjectId, ref: 'Passenger', required: true })
  passenger: Passenger;

  @Prop({ required: true, default: 'active' })
  status: string; // 'active' | 'completed'
}

export const RideSchema = SchemaFactory.createForClass(Ride);
