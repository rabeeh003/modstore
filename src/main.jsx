import React from 'react'
import ReactDOM from 'react-dom/client'
import { NextUIProvider } from '@nextui-org/react'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store } from './redux/store.js'
import { persistStore } from 'redux-persist'
import { BrowserRouter } from 'react-router-dom'

let persister = persistStore(store)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persister}>
        <NextUIProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </NextUIProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
