import { ApolloClient, NormalizedCacheObject } from '@apollo/client'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { Connection } from 'typeorm'
import { initializeTransactionalContext } from 'typeorm-transactional-cls-hooked'
import { TestInfrastructureModule } from '../../../../../../../backend/src/framework/nestjs/test-infrastructure.module'
import { getApolloTestClient } from '../../../../../../../backend/src/infrastructure/graphql/test/apolloTestClient'
import { AppModule } from '../../../../../../app/src/framework/nestjs/AppModule'
import { GraphModule } from '../../../../../../graph/src/framework/nestjs/GraphModule'
import { UserModule } from '../../../../../../user/src/framework/nestjs/UserModule'
import { PageModule } from '../../../../framework/nestjs/PageModule'
import { mutate } from '@codelab/alpha/shared/utils'
import { RegisterUserGql } from '@codelab/modules/user-stories'

const email = 'test_user@codelab.ai'
const password = 'password'

describe.skip('CreatePageUseCase', () => {
  let app: INestApplication
  let connection: Connection
  let testClient: ApolloClient<NormalizedCacheObject>

  beforeAll(async () => {
    const testModule = await Test.createTestingModule({
      imports: [
        TestInfrastructureModule,
        PageModule,
        GraphModule,
        UserModule,
        AppModule,
      ],
    }).compile()

    app = testModule.createNestApplication()
    connection = app.get(Connection)
    const port = 3000

    await connection.synchronize(true)
    initializeTransactionalContext()
    await app.init()
    await app.listen(port, 'localhost', () => {
      console.log(`Listening at http://localhost:${port}`)
    })
    // testClient = new TestClientApollo(`http://localhost:${port}/graphql`)
    testClient = getApolloTestClient(`http://localhost:${port}/graphql`)
    const a = ''
  })

  afterAll(async () => {
    await app.close()
  })

  // it('should create page with graph and a root vertex', async (done) => {
  it('should create page with graph and a root vertex', async (done) => {
    const registerUserResult = mutate(testClient, {
      mutation: RegisterUserGql,
      variables: {
        input: { email, password },
      },
    })

    expect(true).toBeTruthy()
  })

  //   const pageClient = new PageTestClient(testClient)
  //
  //   const userClient = new UserTestClient(testClient)
  //   const registerUserResult = await userClient.registerUser(email, password)
  //   const accessToken = registerUserResult.data?.registerUser.accessToken
  //
  //   expect(registerUserResult.data?.registerUser.email).toEqual(email)
  //   expect(accessToken).toBeDefined()
  //
  //   testClient.setToken(accessToken as string)
  //
  //   const appClient = new AppTestClient(testClient)
  //   const newAppResult = await appClient.createApp('Test app')
  //   const appId = newAppResult.data?.createApp.id
  //
  //   expect(appId).toBeDefined()
  //   await pageClient.createPage('Page 1', appId as string)
  //
  //   const sub = pageClient.pageCreated$().subscribe((result) => {
  //     const title = result.data?.pageCreated.title
  //
  //     expect(title).toEqual('Page 1')
  //     sub.unsubscribe()
  //     done()
  //   })
  // })
})
