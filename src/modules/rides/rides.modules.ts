import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Ride, RideSchema } from './schemas/ride.schema';
import { RidesService } from './rides.service';
import { RidesController } from './rides.controller';
import { Driver, DriverSchema } from '../drivers/schemas/driver.schema';
import { Passenger, PassengerSchema } from '../passengers/schemas/passenger.schema';
import { InvoiceModule } from '../invoices/invoice.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Ride.name, schema: RideSchema },
      { name: Driver.name, schema: DriverSchema },
      { name: Passenger.name, schema: PassengerSchema },
    ]),
    forwardRef(() => InvoiceModule),

  ],
  controllers: [RidesController],
  providers: [RidesService],
  exports: [RidesService, MongooseModule],
})
export class RidesModule {}
