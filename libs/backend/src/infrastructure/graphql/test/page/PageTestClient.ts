import { FetchResult } from '@apollo/client'
import gql from 'graphql-tag'
import { TestClientBase } from '../TestClientBase'

export interface ICreatePage {
  createPage: string
}

export class PageTestClient extends TestClientBase {
  async createPage(
    title: string,
    appId: string,
  ): Promise<FetchResult<ICreatePage>> {
    return this.client.mutate({
      mutation: gql(`
				mutation {
				  createPage(input: {title: "${title}", appId: "${appId}"})
				}
			`),
    })
  }
}
