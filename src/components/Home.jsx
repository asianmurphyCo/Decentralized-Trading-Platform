// import React from 'react'
import assistant from '../components/assets/kiana-kiana-wave.gif'
import bannerimg from '../components/assets/stockchart.jpeg'
import './css/style.css'

import Accordion from "react-bootstrap/Accordion";

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
      {/* HOMED BANNER */}
      <section className="homepage">
        <div className="container mb-5">
          <div className="allign-items-center row d-flex">
            {/* SEPERATE THE BANNER INTO 2 */}
            <div className="col-xl-6 col-md-6 col-12 mb-5">
              <div>
                <div>
                  <span className="tagline">Welcome to AsianMurphy</span>
                  <h1>A Decentralized Trading Platform</h1>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the
                    industry&apos;s standard dummy text ever since the 1500s,
                    when an unknown printer took a galley of type and scrambled
                    it to make a type specimen book.
                  </p>
                  <button className="btn my-2 my-sm-2 btn-lg get-wallet">
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

            <div className="col-xl-6 col-md-6 col-12 mb-5">
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
        {/* OTHER CONTENTS */}
        <div className="container">
          <div className="allign-items-center row d-flex justify-content-center">
            <div className="col-12">
              <div className="features">
                <h2 className="mb-5">Why choose us?</h2>
                <div className="allign-items-center row d-flex mb-5">
                  <div className="col-xl-4 col-md-4 col-12 mb-3">
                    <h2>Secure</h2>
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book.
                    </p>
                  </div>
                  <div className="col-xl-4 col-md-4 col-12 mb-3">
                    <h2>Fast trading</h2>
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book.
                    </p>
                  </div>
                  <div className="col-xl-4 col-md-4 col-12 mb-3">
                    <h2>Up-to-date</h2>
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* CUSTOMER QnAs */}
        <div className="container mt-5">
          <div className="allign-items-center row d-flex ">
            <div className="col-xl-4 col-md-4 col-12">
              <p className="fw-bold">Frequently Asked</p>
              <h3 className="">Questions</h3>
              <p className="">
                Find answers to the most frequently asked questions about
                AsianMurphy right here.
              </p>
            </div>
            {/* QUESTION AND ANSWER */}
            <div className="col-xl-8 col-md-8 col-12">
              <div>
                <Accordion defaultActiveKey="0">
                  <Accordion.Item eventKey="0">
                    {/* QUESTION 1 */}
                    <Accordion.Header className="">
                      What&apos;s is Wallet ?
                    </Accordion.Header>
                    {/* ANSWER 1 */}
                    <Accordion.Body className="bg-primary">
                      A DEX wallet, short for Decentralized Exchange wallet, is
                      a digital wallet specifically tailored for use with
                      decentralized exchanges (DEXs). It serves as a secure
                      repository for your cryptocurrencies and facilitates
                      direct interaction with decentralized trading platforms.
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="1">
                    {/* QUESTION 2 */}
                    <Accordion.Header>
                      What is a Decentralized Exchange (DEX)?
                    </Accordion.Header>
                    {/* ANSWER 2 */}
                    <Accordion.Body className="bg-primary">
                      A DEX is a type of cryptocurrency exchange that operates
                      without a central authority or intermediary. It allows
                      users to trade directly with each other using smart
                      contracts on a blockchain, providing increased security,
                      transparency, and control over funds.
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="2">
                    {/* QUESTION 3 */}
                    <Accordion.Header>
                      How is a DEX different from a Centralized Exchange (CEX)?
                    </Accordion.Header>
                    {/* ANSWER 3 */}
                    <Accordion.Body className="bg-primary">
                      Unlike centralized exchanges, DEXs do not rely on a
                      central authority to facilitate transactions. Users retain
                      control of their private keys and funds, reducing the risk
                      of hacking or mismanagement. Additionally, DEXs typically
                      offer a wider range of supported tokens due to their
                      decentralized nature.
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="3">
                    {/* QUESTION 4 */}
                    <Accordion.Header>
                      How do I get started on the DEX platform ?
                    </Accordion.Header>
                    {/* ANSWER 4 */}
                    <Accordion.Body className="bg-primary">
                      To get started, visit our website and create an account.
                      Make sure to securely store your private key or seed
                      phrase, as it's crucial for accessing your funds. Once
                      your account is set up, you can deposit cryptocurrencies
                      and start trading on the platform.
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="4">
                    {/* QUESTION 5 */}
                    <Accordion.Header>What is Web3 ?</Accordion.Header>
                    {/* ANSWER 5 */}
                    <Accordion.Body className="bg-primary">
                      Web3 refers to the next generation of the internet,
                      emphasizing a decentralized and user-centric approach.
                      Unlike the current Web2, which relies on centralized
                      platforms and intermediaries, Web3 aims to empower users
                      by putting them in control of their data, identity, and
                      digital interactions.
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="5">
                    {/* QUESTION 6 */}
                    <Accordion.Header>
                      What is a Crypto Wallet ?
                    </Accordion.Header>
                    {/* ANSWER 6 */}
                    <Accordion.Body className="bg-primary">
                      A DEX wallet, short for Decentralized Exchange wallet, is
                      a digital wallet specifically tailored for use with
                      decentralized exchanges (DEXs). It serves as a secure
                      repository for your cryptocurrencies and facilitates
                      direct interaction with decentralized trading platforms
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
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