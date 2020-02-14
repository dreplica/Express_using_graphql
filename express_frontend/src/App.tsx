import React from 'react';
import store from './Redux/store/store'
import { Provider } from 'react-redux'
import ApolloClient from 'apollo-boost'
import Register from './Components/AuthorizationComponents/Register';
import Login from './Components/AuthorizationComponents/login';
import { client } from './index';
import {ApolloProvider} from '@apollo/react-hooks'

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <Register />
        <Login />
      </Provider>
    </ApolloProvider>
  );
}


export default App;
