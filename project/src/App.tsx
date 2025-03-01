import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import Community from './pages/Community';
import Leaderboard from './pages/Leaderboard';
import Login from './pages/Login';
import AddProduct from './pages/AddProduct';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';
import M_leaderboard from'./pages/M_leaderboard';
import Notification from './pages/notification';
import Adminproducts from './pages/adminproducts'
import ManufacturerDashboard from './pages/ManufacturerDashboard';
import Mycart from "./pages/Mycart"
import BuyNow from "./pages/BuyNow"
import Payment from "./pages/Payment"
import FAQ from "./pages/FAQ"
import About from "./pages/About"


function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/AddProduct" element={<AddProduct />} />
          <Route path="/products" element={<Products />} />
          <Route path="/community" element={<Community />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/manufacturer_leaderboard" element={<M_leaderboard />} />
          <Route path="/register" element={<Register />} />
          <Route path="/mycart" element={<Mycart />} />
          <Route path="/adminproducts" element={<Adminproducts />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/notifications" element={<Notification />} />
          <Route path="/buy/:productId" element={<BuyNow />} />
          <Route path="/manufacturer" element={<ManufacturerDashboard />} />
          <Route path="/payment/:productId" element={<Payment/>} />
          <Route path="/faq" element={<FAQ/>} />
          <Route path="/about" element={<About/>} />
          
        </Routes>
      </div>
    </Router>
  );
}

// /manufacturer_leaderboard

export default App;