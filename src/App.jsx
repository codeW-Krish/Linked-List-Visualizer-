import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import LinkedListVisualizer from './components/LinkedList/LinkedListVisualizer'
import CircularLinkedListVisualizer from './components/CircularLinkedList/CircularLinkedListVisualizer'
import Navigation from './components/Navigation'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app">
        <Navigation />
        <Routes>
          <Route path="/singly" element={<LinkedListVisualizer />} />
          <Route path="/circular" element={<CircularLinkedListVisualizer />} />
          <Route path="/" element={<Navigate to="/singly" replace />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
