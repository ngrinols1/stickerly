import React from 'react'
import Shop from './components/Shop'
import Header from './components/Header'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import About from './About/About';
import Contact from './Contact/Contact';
import Specific from './Item/Specific';
import ItemDetail from './Item/ItemDetail';
import "./App.css"
import Cart from './components/Cart';
import { CartContextProvider } from './CartContext';
import { Success } from './paidpages/Success';
import { Fail } from './paidpages/Fail';
function App() {


  return (
    <CartContextProvider>
    <Header />
    
    <Router>
    <div className="app-content">
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/shop" element={<CartContextProvider><Shop/></CartContextProvider>} />
        <Route path='/about' element={<About/>} />
        <Route path='contact' element={<Contact/>} />
        <Route path='/testing' element={<Specific id={1}/>}/>
        <Route path="/item/:id" element={<CartContextProvider> <ItemDetail /> </CartContextProvider>} />
        <Route path='/cart' element={<CartContextProvider> <Cart/> </CartContextProvider>} />
        <Route path='/success' element={<Success/>}/>
        <Route path='/unsuccess' element={<Fail/>}/>

      </Routes>
    </div>
  </Router>
  </CartContextProvider>
  )
}

export default App