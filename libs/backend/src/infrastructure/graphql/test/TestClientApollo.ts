import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client'
import { WebSocketLink } from '@apollo/client/link/ws'
import { getMainDefinition } from '@apollo/client/utilities'
import { ApolloLink, split } from 'apollo-link'
import { setContext } from 'apollo-link-context'
import { onError } from 'apollo-link-error'
import * as fetch from 'node-fetch'
import { SubscriptionClient } from 'subscriptions-transport-ws'
// import * as ws from 'ws'; doesnt work...
// eslint-disable-next-line @typescript-eslint/no-var-requires
const WebSocket = require('ws')

export class TestClientApollo {
  declare url: string

  token: any

  declare client: ApolloClient<NormalizedCacheObject>

  declare httpLink: HttpLink

  errorLink: any

  declare wsLink: WebSocketLink

  authLink: any

  constructor(url: string, token: any = null) {
    this.url = url
    this.token = token

    this.errorLink = onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          ),
        )
      }

      if (networkError) {
        console.log(`[Network error]: ${networkError}`)
      }
    })

    this.httpLink = new HttpLink({ uri: this.url, fetch } as any)
    const client = new SubscriptionClient(
      this.url.replace('http://', 'ws://'),
      {
        reconnect: true,
        connectionParams: () => ({
          token: this.token,
        }),
        timeout: 1000,
      },
      WebSocket,
    )

    this.wsLink = new WebSocketLink(client)

    this.authLink = setContext((_, { headers }) => {
      return { headers: { ...headers, authorization: `Bearer ${this.token}` } }
    })
    this.setClient()
  }

  getClient() {
    return this.client
  }

  setClient() {
    this.client = new ApolloClient({
      // @ts-ignore
      link: split(
        // split based on operation type
        ({ query }) => {
          const {
            kind,
            operation,
          }: {
            kind: string
            operation?: string
          } = getMainDefinition(query)

          return kind === 'OperationDefinition' && operation === 'subscription'
        },
        (this.wsLink as unknown) as ApolloLink,
        this.authLink.concat(this.errorLink).concat(this.httpLink),
      ),
      cache: new InMemoryCache({ addTypename: false }),
    })
  }

  setToken(token: string) {
    this.token = token
    this.authLink = setContext((_, { headers }) => {
      return { headers: { ...headers, authorization: `Bearer ${this.token}` } }
    })
    this.setClient()
  }
}
