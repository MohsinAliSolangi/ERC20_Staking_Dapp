import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {Toaster} from "react-hot-toast"
import { StoreProvider } from './Store/Store.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <StoreProvider>
    <Toaster className="toast" position="bottom-left"/>
    <App />
    </StoreProvider>
  // </React.StrictMode>,
)
