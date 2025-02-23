import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ride } from './schemas/ride.schema';
import { CreateRideDto } from './dto/create-ride.dto';
import { UpdateRideDto } from './dto/update-ride.dto';

@Injectable()
export class RidesService {
  constructor(@InjectModel(Ride.name) private readonly rideModel: Model<Ride>) {}

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

  async completeRide(id: string): Promise<Ride> {
    return this.rideModel.findByIdAndUpdate(id, { status: 'completed' }, { new: true }).exec();
  }

  async remove(id: string): Promise<Ride> {
    return this.rideModel.findByIdAndDelete(id).exec();
  }
}
