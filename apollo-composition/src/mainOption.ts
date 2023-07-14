import { createApp, provide, h } from 'vue'
import App from './App.vue'
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
//import { ApolloClients } from '@vue/apollo-composable'
import { createApolloProvider } from '@vue/apollo-option'


const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql'
})


const cache = new InMemoryCache()

const apolloClient = new ApolloClient({
  link: httpLink,
  cache
})

const apolloProvider = createApolloProvider({
  defaultClient: apolloClient,
  /* clent1: apolloClient2
  client2: apolloClient3 */
})

const app = createApp({
  render: () => h(App),
})
app.use(apolloProvider)
app.mount('#app')

