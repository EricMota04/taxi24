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
    const passenger = await this.passengerModel.findById(passengerId);
    if (!passenger || !passenger.location || !Array.isArray(passenger.location.coordinates) || passenger.location.coordinates.length !== 2) {
      throw new Error('Passenger location is invalid');
    }
  
    return this.driverModel.aggregate([
      {
        $geoNear: {
          near: { type: 'Point', coordinates: passenger.location.coordinates as [number, number] },
          distanceField: 'distance',
          maxDistance: 5000, // 5 km en metros
          spherical: true,
        },
      },
      { $match: { available: true } }, // Solo conductores disponibles
      { $limit: 3 }, // Máximo 3 conductores
    ]).exec();
  }
}  
  

