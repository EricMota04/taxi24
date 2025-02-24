import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ride } from './schemas/ride.schema';
import { CreateRideDto } from './dto/create-ride.dto';
import { UpdateRideDto } from './dto/update-ride.dto';
import { InvoiceService } from '../invoices/invoice.service';

@Injectable()
export class RidesService {
  constructor(
    @InjectModel(Ride.name) private readonly rideModel: Model<Ride>,
    @Inject(forwardRef(() => InvoiceService)) private readonly invoiceService: InvoiceService,   ) {}

  async findAll(): Promise<Ride[]> {
    return this.rideModel.find().exec();
  }

  async findActive(): Promise<Ride[]> {
    return this.rideModel.find({ status: 'active' }).exec();
  }

  async findOne(id: string): Promise<Ride> {
    return this.rideModel.findById(id).exec();
  }

  async create(createRideDto: CreateRideDto): Promise<Ride> {
    const newRide = new this.rideModel(createRideDto);
    return newRide.save();
  }

  async update(id: string, updateRideDto: UpdateRideDto): Promise<Ride> {
    return this.rideModel.findByIdAndUpdate(id, updateRideDto, { new: true }).exec();
  }

  async completeRide(rideId: string): Promise<Ride> {
    console.log(`🔍 Buscando ride con ID: ${rideId}`);
  
    const ride = await this.rideModel.findById(rideId).populate('driver passenger');
  
    if (!ride) {
      throw new Error(`🚨 Ride with ID ${rideId} not found`);
    }
  
    console.log(`✅ Ride encontrado:`, ride);
  
    ride.status = 'completed';
    await ride.save();
  
    console.log(`💾 Ride actualizado, generando factura...`);
  
    // Generar factura automáticamente
    await this.invoiceService.createInvoice(rideId);
  
    return ride;
  }
  

  async remove(id: string): Promise<Ride> {
    return this.rideModel.findByIdAndDelete(id).exec();
  }
  
}
