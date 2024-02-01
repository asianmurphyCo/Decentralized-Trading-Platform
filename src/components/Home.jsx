// import React from 'react'
import assistant from '../components/assets/kiana-kiana-wave.gif'
import './css/style.css'

const Home = () => {
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
    <div>
        <div className='assist-sector bg-transparent'>
          <img src={assistant} alt='assistant' className='assistant'onMouseOver={showchat} onMouseOut={hidechat}/>
      </div>
      <div className='notification' id='chatbox'>
        <p className='card-text'>Chat with Tuna now!</p>
      </div>
    </div>
    
  )
}

export default Home