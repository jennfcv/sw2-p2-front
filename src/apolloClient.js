// src/apolloClient.js
import { ApolloClient, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
  uri: 'http://localhost:8080/graphql', // URL de tu backend SpringBoot con GraphQL
  cache: new InMemoryCache(),
})

export default client
