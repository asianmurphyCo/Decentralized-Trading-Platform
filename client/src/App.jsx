import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css'
import Header from './components/header';
import Footer from './components/footer';
import Login from './components/Login';
import Register from "./components/Register";
import Home from './components/Home';
import Dashboard from './components/dashboard';
import Profile from "./components/profile";
import TransactionHistory from "./components/transactionHistory";
import Trade from "./components/trade";
import Market from "./components/Market";
import SellAsset from "./components/SellAsset";
import {useState} from 'react';
import { useEffect } from "react";



function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    fetch('/verify', {
      method: 'POST',
      // headers: {
      //   'Content-Type': 'application/json' ,
      // },
    })
    .then((r) => r.json())
    .then((r) => {
      if (r.message === 'success') {
        setIsLoggedIn('success' === r.message);
      } else {
        console.log("bug")
        localStorage.removeItem("token");
      }
      
      
      console.log(r.message)
      

    }) 
  })

  return (
    <>
      <Router>
        <div className="App">
          <Header isLoggedIn = {isLoggedIn} setIsLoggedIn = {setIsLoggedIn} />
          <Routes>
            <Route index element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile isLoggedIn = {isLoggedIn} />} />
            <Route path="/transactionHistory" element={<TransactionHistory isLoggedIn = {isLoggedIn}/>}/>
            <Route path="/transaction" element={<TransactionHistory />} />
            <Route path="/trade" element={<Trade isLoggedIn={isLoggedIn} />} />
            <Route path="/market" element={<Market />} />
            <Route path="/sell_asset" element={<SellAsset/>}/>
          </Routes>
          <Footer />
        </div>
      </Router>
    </>
  );
}

export default App