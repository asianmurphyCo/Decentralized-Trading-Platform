import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import './App.css'
import Header from './components/header';
import Footer from './components/footer';
import Login from './components/Login';
import Home from './components/Home';
import Dashboard from './components/dashboard';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Header />}>
      <Route index element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard/>} />
    </Route>
  )
)

function App() {
  return (
    <>
      <div>
        <RouterProvider router={router}/>
        <Footer />
      </div>
    </>
  )
}

export default App
