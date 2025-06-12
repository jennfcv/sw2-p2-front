import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { ApolloProvider } from '@apollo/client'
import 'core-js'

import App from './App'
import store from './store'
import client from './apolloClient'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Provider>
)
