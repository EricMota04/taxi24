import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Passenger, PassengerSchema } from './schemas/passenger.schema';
import { PassengersService } from './passengers.service';
import { PassengersController } from './passengers.controller';
import { Driver, DriverSchema } from '../drivers/schemas/driver.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Passenger.name, schema: PassengerSchema },
      { name: Driver.name, schema: DriverSchema },
    ]),
  ],
  controllers: [PassengersController],
  providers: [PassengersService],
  exports: [PassengersService],
})
export class PassengersModule {}
