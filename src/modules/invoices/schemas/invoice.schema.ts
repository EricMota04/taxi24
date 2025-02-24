import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Invoice extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Ride', required: true })
  ride: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Driver', required: true })
  driver: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Passenger', required: true })
  passenger: Types.ObjectId;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  status: string; // 'paid' | 'pending'
}

export const InvoiceSchema = SchemaFactory.createForClass(Invoice);
