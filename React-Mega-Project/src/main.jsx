import React from 'react'
import ReactDom from 'react-dom/client'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Provider} from 'react-redux'
import store from './store/store.js'

const root = ReactDom.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <Provider store={store}> {/* Wrap your app with the Provider */}
      <App />
    </Provider>
  </StrictMode>
);
