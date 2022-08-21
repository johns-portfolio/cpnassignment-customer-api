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
import { CustomersService } from './customers.service'

@Controller('/v1/customers')
export class CustomersController {
	constructor(private readonly customerService: CustomersService) {}

	@Get()
	async getCustomer(@Query() body: GetCustomerRequest) {
		const customers = await this.customerService.searchCustomer(body)
		return customers
	}

	@Get(':id')
	async findCustomerById(@Param('id') id: string) {
		const data = await this.customerService.findCustomerById(id)
		if (!data) {
			throw new NotFoundException('Customer is not found')
		}
		return data
	}

	@Post()
	async addCustomer(@Body() body: AddCustomerRequest) {
		const result = await this.customerService.insertCustomer(body)
		return { id: result }
	}

	@Put(':id')
	async updateCustomer(
		@Param('id') id: string,
		@Body() body: UpdateCustomerRequest,
	) {
		const result = await this.customerService.updateCustomer(id, body)
		return { id: result }
	}

	@Delete(':id')
	async deleteCustomer(@Param('id') id: string) {
		const result = await this.customerService.deleteCustomer(id)
		return { id: result }
	}
}

export type GetCustomerRequest = {
	email: string
	birthday: string
	primaryPhone: string
}

export type AddCustomerRequest = {
	username: string
	email: string
	birthday: string
	primaryPhone: string
}

export type UpdateCustomerRequest = {
	email: string
	birthday: string
	primaryPhone: string
}
