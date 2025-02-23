import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Driver extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, type: Object })
  location: {
    lat: number;
    lng: number;
  };

  @Prop({ default: true })
  available: boolean;
}

export const DriverSchema = SchemaFactory.createForClass(Driver);
