import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { DriversModule } from './modules/drivers/drivers.module';
import { PassengersModule } from './modules/passengers/passengers.module';
import { RidesModule } from './modules/rides/rides.modules';
import { InvoiceModule } from './modules/invoices/invoice.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI),
    DriversModule,
    PassengersModule,
    RidesModule,
    InvoiceModule
  ],
})
export class AppModule {}
