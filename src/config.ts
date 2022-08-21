import * as dotenv from 'dotenv'
dotenv.config()

export const appConfig = {
	port: +process.env.PORT,
	firebase: {
		apiKey: 'AIzaSyAJwbzsA96cPaynX4TH9kc2FbwQ8k32voU',
		authDomain: 'cpn-assignment.firebaseapp.com',
		databaseURL:
			'https://cpn-assignment-default-rtdb.asia-southeast1.firebasedatabase.app',
		projectId: 'cpn-assignment',
		storageBucket: 'cpn-assignment.appspot.com',
		messagingSenderId: '1001914651076',
		appId: '1:1001914651076:web:4dbfa5f49281cf449ed491',
	},
}
