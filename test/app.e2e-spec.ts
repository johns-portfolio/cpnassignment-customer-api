import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from './../src/app.module'

describe('AppController (e2e)', () => {
	let app: INestApplication

	beforeEach(async () => {
		const moduleRef = await Test.createTestingModule({
			imports: [AppModule],
		}).compile()

		app = moduleRef.createNestApplication()
		await app.init()
	})

	it('/ (GET)', async () => {
		return request(app.getHttpServer())
			.get('/')
			.then((result) => {
				expect(result.status).toBe(200)
				expect(result.body).toMatchObject({
					status: 'Ok',
					version: '1.0.0',
				})
			})
	})
})
