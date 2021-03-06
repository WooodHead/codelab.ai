import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { print } from 'graphql'
import request from 'supertest'
import { Connection } from 'typeorm'
import { v4 as uuidv4 } from 'uuid'
import { UserModule } from '../../../../framework/nestjs/UserModule'
import { UserDto } from '../../../../presentation/UserDto'
import { RegisterUserGql } from '../registerUser/RegisterUser.generated'
import { UpdateUserGql } from './UpdateUser.generated'
import { TestInfrastructureModule } from '@codelab/backend'

const email = 'test_user@codelab.ai'
const newEmail = 'test_user_edit@codelab.ai'
const password = 'password'

describe('UpdateUserUseCase', () => {
  let app: INestApplication
  let connection: Connection
  let user: UserDto

  beforeAll(async () => {
    const testModule = await Test.createTestingModule({
      imports: [TestInfrastructureModule, UserModule],
    }).compile()

    app = testModule.createNestApplication()
    connection = app.get(Connection)
    await connection.synchronize(true)
    await app.init()

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

  it('should update user', async () => {
    await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: print(UpdateUserGql),
        variables: {
          input: {
            id: user.id,
            email: newEmail,
          },
        },
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.updateUser.email).toEqual(newEmail)
      })
  })

  it('Should return an error when updating non-existent user', async () => {
    const userId = uuidv4()

    await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: print(UpdateUserGql),
        variables: {
          input: {
            id: userId,
            email: newEmail,
          },
        },
      })
      .expect(200)
      .expect((res) => {
        const errorMsg = res.body?.errors[0].message

        expect(errorMsg).toEqual(
          `Theres no email ${userId} associated with any account`,
        )
      })
  })
})
