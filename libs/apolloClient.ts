import { ApolloClient, from, HttpLink, InMemoryCache } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { RetryLink } from '@apollo/client/link/retry'
import { config } from './config'

const httpLink = new HttpLink({ uri: config.apiUrl })

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    for (const { message, path } of graphQLErrors) {
      console.error(`[GraphQL Error]: ${message} at ${path}`)
    }
  }
  if (networkError) {
    console.error(`[Network Error]: ${networkError}`)
  }
})

const retryLink = new RetryLink({ attempts: { max: 2 } })

export const apolloClient = new ApolloClient({
  link: from([retryLink, errorLink, httpLink]),
  cache: new InMemoryCache(),
})
