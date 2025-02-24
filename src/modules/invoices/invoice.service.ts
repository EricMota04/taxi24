import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Invoice } from './schemas/invoice.schema';
import { Ride } from '../rides/schemas/ride.schema';
import { RidesService } from '../rides/rides.service';

export class InvoiceService {
    constructor(
      @InjectModel(Invoice.name) private readonly invoiceModel: Model<Invoice>,
      @InjectModel(Ride.name) private readonly rideModel: Model<Ride>, 
      @Inject(forwardRef(() => RidesService)) private readonly ridesService: RidesService,
    ) {}

  async createInvoice(rideId: string): Promise<Invoice> {
    const ride = await this.rideModel.findById(rideId).populate('driver passenger');
    if (!ride) {
      throw new Error('Ride not found');
    }

    const invoice = new this.invoiceModel({
      ride: ride._id,
      driver: ride.driver._id,
      passenger: ride.passenger._id,
      amount: this.calculateAmount(ride),
      status: 'pending',
    });

    return invoice.save();
  }

  private calculateAmount(ride: Ride): number {
    return Math.random() * (50 - 10) + 10; // Simulación de un costo entre $10 y $50
  }
}
