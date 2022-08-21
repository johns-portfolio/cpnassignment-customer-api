import * as dotenv from 'dotenv'
dotenv.config()

export const appConfig = {
	port: +process.env.PORT,
	firebase: {
		apiKey: process.env.FIREBASE_API_KEY,
		projectId: process.env.FIREBASE_PROJECT_ID,
		appId: process.env.FIREBASE_APP_ID,
	},
}
