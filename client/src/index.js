import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {configureStore} from "@reduxjs/toolkit"
import globalReducer from "state/index"
import { Provider } from 'react-redux';
import {api,api2} from "state/api"
import { setupListeners } from '@reduxjs/toolkit/query';


const store = configureStore({
    reducer: {
        global: globalReducer,
        [api.reducerPath]: api.reducer,
        [api2.reducerPath]: api2.reducer,

    },
    middleware: (global) => global().concat(api.middleware,api2.middleware)
});

setupListeners(store.dispatch)
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store = {store}>
    <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
