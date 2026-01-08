import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import  store  from "./store";
import { createRoot } from 'react-dom/client'
import 'flowbite';
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  // <StrictMode> momentaneamente commentata perchè sennò use effect fa due fetch api
  <Provider store={store}>
       <App />
  </Provider>
 
  // </StrictMode>,
)
