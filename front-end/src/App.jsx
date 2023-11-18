
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './Components/Navbar'
import Payment from './Components/pages/Payment'
import Purchase from './Components/pages/Purchase'
import Supplier from './Components/pages/Supplier'

function App() {
  return (
    <>
      <div>
        <Navbar/>
        <Routes>
         <Route path='/supplier' element={<Supplier/>}/>
         <Route path='/purchase' element={<Purchase/>}/>
         <Route path='/payment' element={<Payment/>}/>
        </Routes>
      </div>
    </>
  )
}

export default App
