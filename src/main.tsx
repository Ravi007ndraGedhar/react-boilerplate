import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'
import { BrowserRouter } from 'react-router'
import { Layout } from '@/components/layout'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Layout sidebarWidth='300px'>
          <App />
        </Layout>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
