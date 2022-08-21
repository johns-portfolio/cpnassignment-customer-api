import {
	ConflictException,
	Injectable,
	InternalServerErrorException,
	NotFoundException,
} from '@nestjs/common'
import { initializeApp } from 'firebase/app'
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	Firestore,
	getDoc,
	getDocs,
	getFirestore,
	query,
	QueryConstraint,
	setDoc,
	where,
} from 'firebase/firestore'
import { appConfig } from 'src/config'
import {
	AddCustomerRequest,
	GetCustomerRequest,
	UpdateCustomerRequest,
} from './customers.controller'

const firebase = initializeApp(appConfig.firebase)

@Injectable()
export class CustomersService {
	private db = getFirestore(firebase)

	async searchCustomer({ email, birthday, primaryPhone }: GetCustomerRequest) {
		const customersRef = collection(this.db, 'customers')

		const queries: QueryConstraint[] = []
		if (email) {
			queries.push(where('email', '>=', email))
		}
		if (birthday) {
			queries.push(where('birthday', '>=', birthday))
		}
		if (primaryPhone) {
			queries.push(where('primaryPhone', '>=', primaryPhone))
		}
		const querySnapshot = await getDocs(query(customersRef, ...queries))

		const result = {}
		querySnapshot.forEach((doc) => {
			result[doc.id] = doc.data()
		})
		return result
	}

	async findCustomerById(id: string) {
		try {
			const result = await getDoc(doc(this.db, 'customers', id))
			const data = result.data()

			return data
		} catch (error) {
			throw new InternalServerErrorException()
		}
	}

	async insertCustomer({
		username: id,
		email,
		birthday,
		primaryPhone,
	}: AddCustomerRequest) {
		const existCustomer = await this.findCustomerById(id)
		if (existCustomer) {
			throw new ConflictException('Customer has already exist')
		}

		try {
			await setDoc(doc(this.db, 'customers', id), {
				email,
				birthday,
				primaryPhone,
			})

			console.log('Document written with ID: ', id)
			return id
		} catch (e) {
			console.error('Error adding document: ', e)
			throw new InternalServerErrorException()
		}
	}

	async updateCustomer(
		id: string,
		{ email, birthday, primaryPhone }: UpdateCustomerRequest,
	) {
		const existCustomer = await this.findCustomerById(id)
		if (!existCustomer) {
			throw new NotFoundException('Customer is not found')
		}

		try {
			await setDoc(doc(this.db, 'customers', id), {
				...existCustomer,
				email,
				birthday,
				primaryPhone,
			})

			console.log('Document updated with ID: ', id)
			return id
		} catch (e) {
			console.error('Error updated document: ', e)
			throw new InternalServerErrorException()
		}
	}

	async deleteCustomer(id: string) {
		const existCustomer = await this.findCustomerById(id)
		if (!existCustomer) {
			throw new NotFoundException('Customer is not found')
		}
        
		try {
			await deleteDoc(doc(this.db, 'customers', id))
			console.log('Document deleted with ID: ', id)
			return id
		} catch (e) {
			console.error('Error deleted document: ', e)
			throw new InternalServerErrorException()
		}
	}
}
