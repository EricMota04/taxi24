import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Driver extends Document {
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

  @Prop({ required: true })
  available: boolean;
}

export const DriverSchema = SchemaFactory.createForClass(Driver);
DriverSchema.index({ location: '2dsphere' }); // Índice para búsquedas geoespaciales
