import { FetchResult } from '@apollo/client'
import gql from 'graphql-tag'
import { TestClientBase } from '../TestClientBase'

export interface IRegisterUser {
  registerUser: { email: string; accessToken: string }
}

export class UserTestClient extends TestClientBase {
  async registerUser(
    email: string,
    password: string,
  ): Promise<FetchResult<IRegisterUser>> {
    return this.client.mutate({
      mutation: gql(`
			mutation {
				registerUser(input: {email: "${email}", password: "${password}"}) {
					email
					accessToken
					}
			}
			`),
    })
  }
}
