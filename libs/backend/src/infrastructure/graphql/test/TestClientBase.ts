import { ApolloClient, NormalizedCacheObject } from '@apollo/client'
import { TestClientApollo } from './TestClientApollo'

export class TestClientBase {
  declare client: ApolloClient<NormalizedCacheObject>

  constructor(testClientApollo: TestClientApollo) {
    this.client = testClientApollo.getClient()
  }
}
