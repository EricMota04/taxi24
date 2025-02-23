import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Passenger } from './schemas/passenger.schema';
import { CreatePassengerDto } from './dto/create-passenger.dto';
import { UpdatePassengerDto } from './dto/update-passenger.dto';
import { Driver } from '../drivers/schemas/driver.schema';

@Injectable()
export class PassengersService {
  constructor(
    @InjectModel(Passenger.name) private readonly passengerModel: Model<Passenger>,
    @InjectModel(Driver.name) private readonly driverModel: Model<Driver>,
  ) {}

  async findAll(): Promise<Passenger[]> {
    return this.passengerModel.find().exec();
  }

  async findOne(id: string): Promise<Passenger> {
    return this.passengerModel.findById(id).exec();
  }

  async create(createPassengerDto: CreatePassengerDto): Promise<Passenger> {
    const newPassenger = new this.passengerModel(createPassengerDto);
    return newPassenger.save();
  }

  async update(id: string, updatePassengerDto: UpdatePassengerDto): Promise<Passenger> {
    return this.passengerModel.findByIdAndUpdate(id, updatePassengerDto, { new: true }).exec();
  }

  async remove(id: string): Promise<Passenger> {
    return this.passengerModel.findByIdAndDelete(id).exec();
  }

  async findNearestDrivers(passengerId: string): Promise<Driver[]> {
    const passenger = await this.findOne(passengerId);
    if (!passenger) {
      throw new Error('Passenger not found');
    }

    return this.driverModel.find({
      available: true,
    })
    .sort({
      'location.lat': 1,
      'location.lng': 1,
    })
    .limit(3)
    .exec();
  }
}
