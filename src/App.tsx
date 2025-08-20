import { useState } from 'react'
import './App.css'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='text-center'>
      <p className="text-2xl font-semibold mb-4">{count}</p>
      <Button
        onClick={() => setCount((pre) => ++pre)}
      >
        Click me
      </Button>
      <Input />
    </div>

  )
}

export default App
