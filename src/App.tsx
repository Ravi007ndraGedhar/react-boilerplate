import { Route, Routes } from 'react-router'
import '@/App.css'
import HomePage from '@/pages/home'
import AboutPage from '@/pages/about'
import NotFound from '@/pages/notFound'
import TodosPage from './pages/todos'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/todos" element={<TodosPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
