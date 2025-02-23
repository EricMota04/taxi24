import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Ride, RideSchema } from './schemas/ride.schema';
import { RidesService } from './rides.service';
import { RidesController } from './rides.controller';
import { Driver, DriverSchema } from '../drivers/schemas/driver.schema';
import { Passenger, PassengerSchema } from '../passengers/schemas/passenger.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Ride.name, schema: RideSchema },
      { name: Driver.name, schema: DriverSchema },
      { name: Passenger.name, schema: PassengerSchema },
    ]),
  ],
  controllers: [RidesController],
  providers: [RidesService],
  exports: [RidesService],
})
export class RidesModule {}
