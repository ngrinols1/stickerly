import React from 'react'
import Shop from './components/Shop'
import Header from './components/Header'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Contact from './Contact';
import Specific from './Item/Specific';

function App() {



  return (
    <Router>
    <Header />
    <div className="app-content">
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/shop" element={<Shop/>} />
        <Route path='/about' element={<About/>} />
        <Route path='contact' element={<Contact/>} />
        <Route path='/testing' element={<Specific id={1}/>}/>
        
      </Routes>
    </div>
  </Router>
  )
}

export default App