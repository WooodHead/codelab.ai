import { ApolloLink } from '@apollo/client'
import { testAuthLink } from './testAuthLink'
import { testErrorLink } from './testErrorLink'
import { testWsLink } from './testWsLink'

export const testCombinedLink = (url: string, token?: string): ApolloLink => {
  return token
    ? ApolloLink.from([
        testErrorLink,
        testAuthLink(token),
        testWsLink(url, token),
      ])
    : ApolloLink.from([testErrorLink])
}
