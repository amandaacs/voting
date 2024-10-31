import './App.css'
import Names from './Names'
import Voting from './Voting'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Names />} />
        <Route path="/voting" element={<Voting />} />
      </Routes>
    </Router>
  )
}
