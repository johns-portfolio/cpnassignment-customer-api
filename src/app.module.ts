import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomersModule } from './customers/customers.module';
import { AddressesModule } from './addresses/addresses.module';

@Module({
  imports: [CustomersModule, AddressesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
