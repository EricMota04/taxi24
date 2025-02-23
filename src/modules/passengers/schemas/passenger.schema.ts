import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Passenger extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, type: Object })
  location: {
    lat: number;
    lng: number;
  };
}

export const PassengerSchema = SchemaFactory.createForClass(Passenger);
