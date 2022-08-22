import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { appConfig } from './config'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	console.log(`🔥 Application started on http://localhost:${appConfig.port}`)

	await app.listen(appConfig.port)
}
bootstrap()
