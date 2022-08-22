import { CacheInterceptor, CacheModule, Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { CustomersModule } from './customers/customers.module'
import { AddressesModule } from './addresses/addresses.module'
import { APP_INTERCEPTOR } from '@nestjs/core'

@Module({
	imports: [
		CustomersModule,
		AddressesModule,
		CacheModule.register({
			isGlobal: true,
			ttl: 5,
		}),
	],
	controllers: [AppController],
	providers: [
		{
			provide: APP_INTERCEPTOR,
			useClass: CacheInterceptor,
		},
	],
})
export class AppModule {}
