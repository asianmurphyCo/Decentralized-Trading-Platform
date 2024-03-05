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

function App() {
  return (
    <>
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route index element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
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