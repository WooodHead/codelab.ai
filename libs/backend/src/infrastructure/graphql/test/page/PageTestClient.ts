import { FetchResult } from '@apollo/client'
import gql from 'graphql-tag'
import Observable from 'zen-observable'
import { TestClientBase } from '../TestClientBase'

export interface ICreatePage {
  createPage: string
}

export interface IPageCreated {
  pageCreated: { id: string; title: string }
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

  pageCreated$(): Observable<FetchResult<IPageCreated>> {
    return this.client.subscribe({
      query: gql(`
        subscription {
          pageCreated {id title}
        }
      `),
    })
  }
}
