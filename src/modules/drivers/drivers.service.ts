import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Driver } from './schemas/driver.schema';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';

@Injectable()
export class DriversService {
  constructor(@InjectModel(Driver.name) private readonly driverModel: Model<Driver>) {}

  async findAll(): Promise<Driver[]> {
    return this.driverModel.find().exec();
  }

  async findAvailable(): Promise<Driver[]> {
    return this.driverModel.find({ available: true }).exec();
  }

  async findNearby(lat: number, lng: number): Promise<Driver[]> {
    const R = 6371; // Radio de la Tierra en km
    const maxDistance = 3; // Radio de búsqueda en km
    const latRad = (lat * Math.PI) / 180;
    const lngRad = (lng * Math.PI) / 180;

    return this.driverModel.find({
      available: true,
      'location.lat': { $gte: lat - (maxDistance / R) * (180 / Math.PI), $lte: lat + (maxDistance / R) * (180 / Math.PI) },
      'location.lng': { $gte: lng - (maxDistance / (R * Math.cos(latRad))) * (180 / Math.PI), $lte: lng + (maxDistance / (R * Math.cos(latRad))) * (180 / Math.PI) },
    }).exec();
  }

  async findOne(id: string): Promise<Driver> {
    return this.driverModel.findById(id).exec();
  }

  async create(createDriverDto: CreateDriverDto): Promise<Driver> {
    const newDriver = new this.driverModel(createDriverDto);
    return newDriver.save();
  }

  async update(id: string, updateDriverDto: UpdateDriverDto): Promise<Driver> {
    return this.driverModel.findByIdAndUpdate(id, updateDriverDto, { new: true }).exec();
  }

  async remove(id: string): Promise<Driver> {
    return this.driverModel.findByIdAndDelete(id).exec();
  }
}
