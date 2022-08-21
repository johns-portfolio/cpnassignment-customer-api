import {
	Body,
	Controller,
	Delete,
	Get,
	NotFoundException,
	NotImplementedException,
	Param,
	Post,
	Put,
	Query,
} from '@nestjs/common'
import { AddressesService } from './addresses.service'

@Controller('v1/addresses')
export class AddressesController {
	constructor(private readonly addressesService: AddressesService) {}

	@Get(':username')
	async findAddressesByUsername(@Param('username') username: string) {
		const data = await this.addressesService.getAddressesByUsername(username)

		return data
	}

	@Post(':username')
	async addAddresses(
		@Param('username') username: string,
		@Body() address: AddAddressesRequest,
	) {
		const result = await this.addressesService.insertAddresses(
			username,
			address,
		)
		return { id: result }
	}

	@Put(':username/:addressId')
	async updateAddresses(
		@Param('username') username: string,
		@Param('addressId') addressId: string,
		@Body() address: UpdateAddressesRequest,
	) {
		const result = await this.addressesService.updateAddress(username, addressId, address)
		return { id: result }
	}

	@Delete(':username/:addressId')
	async deleteAddresses(
		@Param('username') username: string,
		@Param('addressId') addressId: string,
	) {
		const result = await this.addressesService.deleteAddress(
			username,
			addressId,
		)
		return { id: result }
	}
}

export interface Address {
	addressNumber: string
	moo: string
	soi: string
	road: string
	subDistrict: string
	district: string
	province: string
	postcode: string
}

export interface AddAddressesRequest extends Address {}
export interface UpdateAddressesRequest extends Address {}
