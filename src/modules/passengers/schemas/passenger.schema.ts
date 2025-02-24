import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Passenger extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], required: true },
  })
  location: {
    type: string;
    coordinates: number[];
  };
}

export const PassengerSchema = SchemaFactory.createForClass(Passenger);
PassengerSchema.index({ location: '2dsphere' }); // Índice para búsquedas geoespaciales
