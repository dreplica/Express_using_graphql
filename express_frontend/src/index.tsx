import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ApolloClient, { gql, Operation } from 'apollo-boost';
// import * as serviceWorker from './serviceWorker';
const options = {
    uri: 'http://localhost:3001/graphql',
    request: (operation:Operation) => {
        const token = localStorage['tok'];
        operation.setContext({
            headers: {
                "x-auth-users":token ?? ""
            }
        })
        console.log(operation)
    }
}
export const client = new ApolloClient(options)
    
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
