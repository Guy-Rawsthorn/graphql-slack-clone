import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost'
import Home from './Routes/index';
import 'semantic-ui-css/semantic.min.css';

const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql',
  fetchOptions: {
    credentials: 'include'
  },
  request: async (operation) => {
    const token = await localStorage.getItem('token');
    const refreshToken = await localStorage.getItem('refreshToken')
    operation.setContext({
      headers: {
        authorization: `${token}`,
        refreshToken: `${refreshToken}` 
      }
    });
  },
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
