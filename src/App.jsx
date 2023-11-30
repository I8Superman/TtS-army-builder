import { useState } from 'react'
import Card from '@/components/Card/Card'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h2>This is an h2 in the App component</h2>
      <p>Here is some p text in the app component</p>
      <button onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </button>
      <Card />
      <Card />
      <Card />
    </>
  )
}

export default App
