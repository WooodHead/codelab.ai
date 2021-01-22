import { FetchResult } from '@apollo/client'
import gql from 'graphql-tag'
import { TestClientBase } from '../TestClientBase'

export interface ICreateApp {
  createApp: { id: string; title: string }
}

export class AppTestClient extends TestClientBase {
  async createApp(appTitle: string): Promise<FetchResult<ICreateApp>> {
    return this.client.mutate({
      mutation: gql(`
				mutation {
				  createApp(input: {title: "${appTitle}"}) {
					id
				   	title
				  }
				}
			`),
    })
  }
}
