import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { PassengersService } from './passengers.service';
import { CreatePassengerDto } from './dto/create-passenger.dto';
import { UpdatePassengerDto } from './dto/update-passenger.dto';

@Controller('passengers')
export class PassengersController {
  constructor(private readonly passengersService: PassengersService) {}

  @Get()
  findAll() {
    return this.passengersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.passengersService.findOne(id);
  }

  @Get(':id/nearest-drivers')
  findNearestDrivers(@Param('id') id: string) {
    return this.passengersService.findNearestDrivers(id);
  }

  @Post()
  create(@Body() createPassengerDto: CreatePassengerDto) {
    return this.passengersService.create(createPassengerDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePassengerDto: UpdatePassengerDto) {
    return this.passengersService.update(id, updatePassengerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.passengersService.remove(id);
  }
}
