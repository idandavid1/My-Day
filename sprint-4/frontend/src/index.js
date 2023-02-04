import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { store } from './store/store'
import { RootCmp } from './root-cmp'
import './assets/styles/main.scss'
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId="206331273095-es5eep8nfovokr5vilsalpr8gnqsfdut.apps.googleusercontent.com">
    <Provider store={store}>
      <Router>
        <RootCmp />
      </Router>
    </Provider>
  </GoogleOAuthProvider>
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();