import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { print } from 'graphql'
import request from 'supertest'
import { Connection } from 'typeorm'
import { GetAppsGql } from '../../../../../../app-stories/src/useCases/getApps/GetAppsInput.generated'
import { RegisterUserGql } from '../../../../../../user/src/core/application/useCases/registerUser/RegisterUser.generated'
import { CreateAppGql } from '../createApp/CreateApp.generated'
import { TestInfrastructureModule } from '@codelab/backend'
import { AppModule } from '@codelab/modules/app'
import { UserDto, UserModule } from '@codelab/modules/user'

// export const registerUserMutation = (registerUserInput: RegisterUserInput) => `
//   mutation {
//     registerUser(input: {
//       email: "${registerUserInput.email}",
//       password: "${registerUserInput.password}"
//     }) {
//       email
//       accessToken
//     }
//   }`

// const createAppMutation = (createAppInput: CreateAppInput) => `
//   mutation {
//     createApp(input: {
//       title: "${createAppInput.title}",
//     }) {
//       title
//     }
//   }`

const email = 'test_user@codelab.ai'
const password = 'password'

describe('GetAppsUseCase', () => {
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

  it('should retrieve apps for user', async () => {
    const app1 = 'My App 1'
    const app2 = 'My App 2'

    const app1Req = await request(app.getHttpServer())
      .post('/graphql')
      .set('authorization', `Bearer ${user.accessToken}` ?? '')
      .send({
        query: print(CreateAppGql),
        variables: {
          input: {
            title: app1,
          },
        },
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.createApp.title).toEqual(app1)
      })

    const app2Req = await request(app.getHttpServer())
      .post('/graphql')
      .set('authorization', `Bearer ${user.accessToken}` ?? '')
      .send({
        query: print(CreateAppGql),
        variables: {
          input: {
            title: app2,
          },
        },
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.createApp.title).toEqual(app2)
      })
    const getAppsQuery = `
    {
      getApps { title }
    }
    `
    const getAppsReq = await request(app.getHttpServer())
      .post('/graphql')
      .set('authorization', `Bearer ${user.accessToken}` ?? '')
      .send({
        query: print(GetAppsGql),
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.getApps.length).toEqual(2)
      })
  })
})
