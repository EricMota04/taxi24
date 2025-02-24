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
    try {
      const drivers = await this.driverModel.aggregate([
        {
          $geoNear: {
            near: { type: 'Point', coordinates: [Number(lng), Number(lat)] },
            distanceField: 'distance',
            spherical: true,
            key: 'location', // Asegura que se usa el índice correcto
            maxDistance: 3000 // 3 km en metros
          }
        },
        { $match: { available: true } }, // Filtrar conductores disponibles fuera de $geoNear
        { $limit: 3 }
      ]).exec();
  
      return drivers;
    } catch (error) {
      throw new Error("Error al buscar conductores cercanos");
    }
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
