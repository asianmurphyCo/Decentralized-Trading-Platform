// import React from 'react'
import assistant from '../components/assets/kiana-kiana-wave.gif'
import bannerimg from '../components/assets/stockchart.jpeg'
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
      {/* HEAD BANNER */}
      <section className='homepage'>
        <div className="container">
          <div className="allign-items-center row d-flex">
            {/* SEPERATE THE BANNER INTO 2 */}
            <div className="col-xl-6 col-md-6 col-12">
              <div>
                <div>
                  <span className="tagline">Welcome to AsianMurphy</span>
                  <h1>A Decentralized Trading Platform</h1>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book.
                  </p>
                  <button>
                    Get Started{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      width="25"
                      height="25"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div className="col-xl-6 col-md-6 col-12">
              <div>
                <div className="">
                  <img
                    src={bannerimg}
                    alt="banner-image"
                    className="banner-img"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="assist-sector bg-transparent">
        <img
          src={assistant}
          alt="assistant"
          className="assistant"
          onMouseOver={showchat}
          onMouseOut={hidechat}
        />
      </div>
      <div className="notification" id="chatbox">
        <p className="card-text">Chat with Tuna now!</p>
      </div>
    </div>
  );
}

export default Home