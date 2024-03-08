import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css'
import Header from './components/header';
import Footer from './components/footer';
import Login from './components/Login';
import Home from './components/Home';
import Dashboard from './components/dashboard';
import Profile from "./components/profile";
import TransactionHistory from "./components/transactionHistory";
import Trade from "./components/trade";
import {useState} from 'react';
import { useEffect } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    // const user = localStorage.getItem("user");
    // console.log(user);

    // if (!user || !user.token) {
    //   console.log('Set login is:' + isLoggedIn)
    //   setIsLoggedIn(false);
    //   return;
    // }
    console.log('useeffect is being triggered')

    fetch('/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' ,
      },
    })
    .then((r) => r.json())
    .then((r) => {
      setIsLoggedIn('success' === r.message);
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
            <Route path="/login" element={<Login setIsLoggedIn = {setIsLoggedIn} />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile isLoggedIn = {isLoggedIn} />} />
            <Route path="/transactionHistory" element={<TransactionHistory/>}/>
            <Route path="/transaction" element={<TransactionHistory />} />
            <Route path="/trade" element={<Trade/>}/>
          </Routes>
          <Footer />
        </div>
      </Router>
    </>
  );
}

export default App
