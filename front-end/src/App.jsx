import React from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './Components/Navbar'
import Payment from './Components/pages/Payment/Payment'
import Purchase from './Components/pages/Purchase/Purchase'
import Supplier from './Components/pages/Supplier/Supplier'

function Home() {
  return (
    <div className='flex bg-green-600 text-pink-900 text-4xl font-serif' style={{
      backgroundImage: 'url("https://www.xtrafondos.com/descargar.php?id=5492&resolucion=2560x1440")',
      backgroundSize: 'cover',
      height: '85vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      Welcome to the presentation of Supplier Billing System! 
      In a continuous effort to enhance and optimize our operations, 
      we have developed this tool that will streamline and expedite the billing process, 
      thereby strengthening our relationships with suppliers.
    </div>
  );
}
function App() {
  return (
    <>
      <div>
          <Navbar/>
          <Routes>
          <Route path='/supplier' element={<Supplier/>}/>
          <Route path='/purchase' element={<Purchase/>}/>
          <Route path='/payment' element={<Payment/>}/>
          {/* Add a path for the home page */}
          <Route path='/*' element={<Home />} />
          </Routes>
      </div>
    </>
  )
}

export default App
