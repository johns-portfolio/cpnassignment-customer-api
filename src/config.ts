import * as dotenv from 'dotenv'
dotenv.config()

export const appConfig: AppConfig = {
	port: +process.env.PORT,
}

export type AppConfig = {
	port: number
}
