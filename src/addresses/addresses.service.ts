import {
	ConflictException,
	Injectable,
	InternalServerErrorException,
	NotFoundException,
} from '@nestjs/common'
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	getFirestore,
	query,
	QueryConstraint,
	setDoc,
	where,
} from 'firebase/firestore'
import {
	AddAddressesRequest,
	UpdateAddressesRequest,
} from './addresses.controller'
import { appConfig } from '../config'
import { initializeApp } from 'firebase/app'

const firebase = initializeApp(appConfig.firebase)
const db = getFirestore(firebase)

const customerAddressesCol = 'customer-addresses'
const addressesCol = 'addresses'

@Injectable()
export class AddressesService {
	async getAddressesByUsername(username: string) {
		try {
			const customerAddressesDocRef = doc(db, customerAddressesCol, username)
			const addressesColRef = collection(customerAddressesDocRef, addressesCol)
			const querySnapshot = await getDocs(query(addressesColRef))

			const result = {}
			querySnapshot.forEach((doc) => {
				result[doc.id] = doc.data()
			})
			return result
		} catch (error) {
			throw new InternalServerErrorException()
		}
	}
	async insertAddresses(username: string, address: AddAddressesRequest) {
		try {
			const customerAddressesDocRef = doc(db, customerAddressesCol, username)
			const addressesColRef = collection(customerAddressesDocRef, addressesCol)

			const docRef = await addDoc(addressesColRef, {
				...address,
			})

			console.log('Document written with ID: ', docRef.id)
			return docRef.id
		} catch (e) {
			console.error('Error adding document: ', e)
			throw new InternalServerErrorException()
		}
	}

	async updateAddress(
		username: string,
		addressId: string,
		address: UpdateAddressesRequest,
	) {
		const addressesDocRef = doc(
			doc(db, customerAddressesCol, username),
			addressesCol,
			addressId,
		)
		const existAddressDoc = await getDoc(addressesDocRef)
		const existAddress = existAddressDoc.data()

		if (!existAddress) {
			throw new NotFoundException('Address is not found')
		}

		try {
			await setDoc(addressesDocRef, {
				...existAddress,
				...address,
			})

			console.log('Document updated with ID: ', addressId)
			return addressId
		} catch (e) {
			console.error('Error updated document: ', e)
			throw new InternalServerErrorException()
		}
	}

	async deleteAddress(username: string, addressId: string) {
		const addressesDocRef = doc(
			doc(db, customerAddressesCol, username),
			addressesCol,
			addressId,
		)
		const existAddressDoc = await getDoc(addressesDocRef)
		const existAddress = existAddressDoc.data()

		if (!existAddress) {
			throw new NotFoundException('Address is not found')
		}

		try {
			await deleteDoc(addressesDocRef)
			console.log('Document deleted with ID: ', addressId)
			return addressId
		} catch (e) {
			console.error('Error deleted document: ', e)
			throw new InternalServerErrorException()
		}
	}
}
