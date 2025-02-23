import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { RidesService } from './rides.service';
import { CreateRideDto } from './dto/create-ride.dto';
import { UpdateRideDto } from './dto/update-ride.dto';

@Controller('rides')
export class RidesController {
  constructor(private readonly ridesService: RidesService) {}

  @Get()
  findAll() {
    return this.ridesService.findAll();
  }

  @Get('active')
  findActive() {
    return this.ridesService.findActive();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ridesService.findOne(id);
  }

  @Post()
  create(@Body() createRideDto: CreateRideDto) {
    return this.ridesService.create(createRideDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateRideDto: UpdateRideDto) {
    return this.ridesService.update(id, updateRideDto);
  }

  @Put(':id/complete')
  completeRide(@Param('id') id: string) {
    return this.ridesService.completeRide(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ridesService.remove(id);
  }
}
