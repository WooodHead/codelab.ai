import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { print } from 'graphql'
import request from 'supertest'
import { Connection } from 'typeorm'
import { RegisterUserGql } from '../../../../../../user/src/core/application/useCases/registerUser/RegisterUser.generated'
import { UserModule } from '../../../../../../user/src/framework/nestjs/UserModule'
import { AppModule } from '../../../../framework/nestjs/AppModule'
import { CreateAppGql } from './CreateApp.generated'
import { TestInfrastructureModule } from '@codelab/backend'
import { UserDto } from '@codelab/modules/user'

const email = 'test_user@codelab.ai'
const password = 'password'

describe.skip('CreateAppUseCase', () => {
  let app: INestApplication
  let connection: Connection
  let user: UserDto

  beforeAll(async () => {
    const testModule = await Test.createTestingModule({
      imports: [TestInfrastructureModule, AppModule, UserModule],
    }).compile()

    app = testModule.createNestApplication()
    connection = app.get(Connection)
    await connection.synchronize(true)
    await app.init()

    // Register user
    user = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: print(RegisterUserGql),
        variables: {
          input: {
            email,
            password,
          },
        },
      })
      .then((res) => res.body.data.registerUser)
  })

  afterAll(async () => {
    await app.close()
  })

  it('should create an app for the an authenticated user', async () => {
    const title = 'My App'

    await request(app.getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${user.accessToken}` ?? '')
      .send({
        query: print(CreateAppGql),
        variables: {
          input: {
            title,
          },
        },
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.createApp.title).toEqual(title)
      })
  })

  it('should create not create an app for a guest user', async () => {
    const title = 'My App'

    await request(app.getHttpServer())
      .post('/graphql')
      .set('Authorization', '')
      .send({
        query: print(CreateAppGql),
        variables: {
          input: {
            title,
          },
        },
      })
      .expect(200)
      .then((res) => {
        expect(res.body.errors[0].extensions.code).toBe('UNAUTHENTICATED')
      })
  })
})
