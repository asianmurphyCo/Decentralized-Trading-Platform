import { useState } from 'react'
import reactLogo from './components/assets/react.svg'
import viteLogo from '/vite.svg'
import assistant from './components/assets/kiana-kiana-wave.gif'
import './App.css'
import Header from './components/header'

function App() {
  const [count, setCount] = useState(0)
  // add 0.2s delay before pop up the chatbox
  const showchat = () => {
    setTimeout(() => {
      document.getElementById('chatbox').style.display = 'block';
    }, 200);  
  };

  const hidechat = () => {
    document.getElementById('chatbox').style.display = 'none';
  };
  return (
    <>
      <Header/>
      {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div> */}
      
      <div className='assist-sector bg-transparent'>
          <img src={assistant} alt='assistant' className='assistant'onMouseOver={showchat} onMouseOut={hidechat}/>
      </div>
      <div className='notification' id='chatbox'>
        <p className='card-text'>Need help? Chat with Tuna now!</p>
      </div>
    </>
  )
}

export default App
