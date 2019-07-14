import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes/index';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost'
import Home from './App'
// const networkInterface = createNetworkInterface({
//   uri: 'http://localhost:8000/graphql'
// })

const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql'
})
const app = (
  <ApolloProvider client={client}>
    <Home />
  </ApolloProvider>
);

ReactDOM.render(
  app,
  document.getElementById('root')
);
