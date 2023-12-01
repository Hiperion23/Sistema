import React from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './Components/Navbar'
import Payment from './Components/pages/Payment/Payment'
import Purchase from './Components/pages/Purchase/Purchase'
import Supplier from './Components/pages/Supplier/Supplier'

function Home() {
  return (
    <div
      className="flex text-pink-900 text-lg md:text-2xl lg:text-3xl font-serif items-center justify-center"
      style={{
        backgroundImage: 'url("https://www.xtrafondos.com/descargar.php?id=5492&resolucion=2560x1440")',
        backgroundSize: 'cover',
        height: '89vh',
      }}
    >
      <div className="bg-black bg-opacity-50 p-8 max-w-2xl text-center">
        <h1 className="text-5xl font-bold mb-4">Welcome to the Supplier Billing System</h1>
        <p className="text-lg">
          In a continuous effort to enhance and optimize our operations, we have developed this tool that will streamline
          and expedite the billing process, thereby strengthening our relationships with suppliers.
        </p>
      </div>
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
