import { NestFactory } from '@nestjs/core'
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { AppModule } from './app.module'
import { appConfig } from './config'

const firebase = initializeApp(appConfig.firebase)
export const db = getFirestore(firebase)

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	console.log(`🔥 Application started on http://localhost:${appConfig.port}`)

	await app.listen(appConfig.port)
}
bootstrap()
