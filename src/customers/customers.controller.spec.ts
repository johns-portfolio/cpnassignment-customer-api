import { Test, TestingModule } from '@nestjs/testing'
import { toPromise } from 'src/utils'
import { CustomersController } from './customers.controller'
import { CustomersService } from './customers.service'

describe('CustomersController', () => {
	let customerController: CustomersController
	let customerService: CustomersService

	beforeEach(async () => {
		const app: TestingModule = await Test.createTestingModule({
			controllers: [CustomersController],
			providers: [CustomersService]
		}).compile()

		customerController = app.get(CustomersController)
		customerService = app.get(CustomersService)
	})

	describe('getCustomer', () => {
		it('should return an object of customer', async () => {
			// Arrange
			const data = {
				john: {
					email: '',
					birthday: '',
					primaryPhone: '',
				},
			}
			jest
				.spyOn(customerService, 'searchCustomer')
				.mockImplementation((body) => toPromise(data))

			// Act
			const result = await customerController.getCustomer({})

			// Assert
			expect(result).toBe(data)
		})
	})
})
