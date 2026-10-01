import { Route, Routes } from 'react-router-dom'
import BakeryPage from './pages/BakeryDashboard'
import CustomerPage from './pages/CustomerView'
import HomePage from './pages/HomePage'
import Sobre from './pages/Sobre'

export default function App() {
  return <Routes><Route path="/" element={<HomePage />} /><Route path="/cliente" element={<CustomerPage />} /><Route path="/padaria" element={<BakeryPage />} /><Route path="/sobre" element={<Sobre />} /></Routes>
}
