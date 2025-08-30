import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'
import { BrowserRouter } from 'react-router'
import { Layout } from '@/components/layout'
import { ThemeProvider } from './components/theme/theme-provider.tsx'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
          <Layout sidebarWidth='300px'>
            <App />
          </Layout>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
