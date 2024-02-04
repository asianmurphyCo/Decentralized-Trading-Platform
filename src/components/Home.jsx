// import React from 'react'
import assistant from "../components/assets/kiana-kiana-wave.gif";
import aigif from "../components/assets/honkai-ai.gif";
import bannerimg from "../components/assets/stockchart.jpeg";
import "./css/style.css";
import profile2 from "../components/assets/toothless.png";
import profile1 from "../components/assets/profile1.jpg";
import profile3 from "../components/assets/profile3.png";
import profile4 from "../components/assets/4d7.png";
import profile5 from "../components/assets/profile4.jpg";

import Accordion from "react-bootstrap/Accordion";
import { Link } from "react-router-dom";
import CountUp from "react-countup";

const Home = () => {
  // add 0.2s delay before pop up the chatbox
  const showchat = () => {
    setTimeout(() => {
      document.getElementById("chatbox").style.display = "block";
    }, 200);
  };

  const hidechat = () => {
    document.getElementById("chatbox").style.display = "none";
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
                    <Link className="text-light" to="/login">
                      Get Started{" "}
                    </Link>
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
              {/* STATISTICS */}
              <div className="row justify-content-left align-content-start mt-4">
                <div className="col-lg-4 col-md-4 col-4">
                  <h3 className="mbr-section-title align-left me-1 display-5 ibm-font">
                    <strong>
                      <CountUp end={4542} duration={4} />
                    </strong>
                  </h3>
                  <p className="mbr-section-text align-left">
                    <strong>Wallets</strong>
                    <br />
                  </p>
                </div>
                <div className="col-lg-4 col-md-4 col-4 ">
                  <h3 className="mbr-section-title align-left me-1 display-5 ibm-font">
                    <strong>
                      <CountUp end={4532} duration={4} />
                    </strong>
                  </h3>
                  <p className="mbr-section-text align-left">
                    <strong>Clients</strong>
                    <br />
                  </p>
                </div>
                <div className="col-lg-4 col-md-4 col-4">
                  <h3 className="mbr-section-title  align-left me-1 display-5 ibm-font">
                    <strong>
                      <CountUp end={332} duration={2} />
                    </strong>
                  </h3>
                  <p className="mbr-section-text align-left">
                    <strong>Сurrency</strong>
                    <br />
                  </p>
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
                  <div className="col-12 col-md-6 col-lg-4 md-pb mb-3 p-3 highlight">
                    <h2>Fortified Security Measures</h2>
                    <p>
                      AsianDEXmurphy employs state-of-the-art encryption and
                      authentication for a safe trading environment. Rest
                      assured, your assets and transactions are safeguarded,
                      allowing you to trade with confidence on our innovative
                      platform.
                    </p>
                  </div>
                  <div className="col-12 col-md-6 col-lg-4 md-pb mb-3 p-3 highlight">
                    <h2>Global Accessibility</h2>
                    <p>
                      Our platform is designed to be user-friendly and
                      accessible to a diverse audience worldwide. Whether
                      you&apos;re a seasoned trader or new to the market, our
                      inclusive approach ensures everyone can engage seamlessly
                      with the world of decentralized trading.
                    </p>
                  </div>
                  <div className="col-12 col-md-6 col-lg-4 md-pb mb-3 p-3 highlight">
                    <h2>Swift Transactions</h2>
                    <p>
                      Our platform is optimized for fast transactions, ensuring
                      that you can execute trades quickly and efficiently.
                      Experience the speed of seamless transactions, empowering
                      you to react swiftly to market opportunities and enjoy a
                      smooth trading experience.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* EMBEDS SECTION */}
        <section className="about-us bg-primary">
          <div className="container mb-5">
            <div className="row align-items-center">
              <div className="col-xl-4 col-md-4 col-12">
                <div className="display-4 fw-bold mb-xl-5 text-wrapper md-pb align-left">
                  &nbsp;About Us
                  <img src={aigif} alt="ai-know-your-address" width={80} />
                </div>
                <p className="mbr-text mbr-fonts-style align-left display-7">
                  &quot;Welcome to the AsianDEXmurphy, have a look around
                  <br /> Anything that brain of yours can think of can be found
                  <br /> We&apos;ve got mountains of features, some better, some
                  worse
                  <br />
                  If none of it&apos;s of interest to you, your
                  information&apos;d be the first&quot;
                </p>
                <div className="mbr-section-btn mt-4">
                  <a
                    className="btn my-2 my-sm-2 btn-lg get-wallet"
                    href="https://www.youtube.com/@boburnham"
                  >
                    Check Out More
                  </a>
                </div>
              </div>

              <div className="col-xl-8 col-md-8 col-12 mb-5">
                <div className="ratio ratio-16x9">
                  <iframe
                    className="embed-responsive-item banner-vid"
                    src="https://www.youtube.com/embed/k1BneeJTDcU?si=yQtpLipG12WYohTM"
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* About us */}
        <section className="py-5">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6 order-2 order-lg-1">
                <div className="row g-3">
                  <div className="col-sm-6">
                    {/* 1ST PROFILE */}
                    <div className="card text-center border-0 bg-primary profile">
                      <div className="card-body px-4 py-4">
                        <div className="mb-4 mx-2 mx-md-5">
                          <img
                            className="img-fluid rounded-circle"
                            src={profile1}
                          />
                        </div>
                        <h5 className="fw-bold text-light">Minh Nguyen</h5>
                        <div className="text-light">Team Leader</div>
                      </div>
                    </div>
                  </div>
                  {/* 2ND PROFILE */}
                  <div className="col-sm-6">
                    <div className="card text-center border-0 bg-primary profile">
                      <div className="card-body px-4 py-4">
                        <div className="mb-4 mx-2 mx-md-5">
                          <img
                            className="img-fluid rounded-circle"
                            src={profile2}
                          />
                        </div>
                        <h5 className="fw-bold text-light">Nguyen Thinh</h5>
                        <div className="text-light">Frontend Designer</div>
                      </div>
                    </div>
                  </div>
                  {/* 3RD PROFILE */}
                  <div className="col-sm-6">
                    <div className="card text-center border-0 bg-primary profile">
                      <div className="card-body px-4 py-4">
                        <div className="mb-4 mx-2 mx-md-5">
                          <img
                            className="img-fluid rounded-circle"
                            src={profile3}
                          />
                        </div>
                        <h5 className="fw-bold text-light">Khoa Nguyen</h5>
                        <div className="text-light">Backend Developer</div>
                      </div>
                    </div>
                  </div>
                  {/* 4TH PROFILE */}
                  <div className="col-sm-6">
                    <div className="card text-center border-0 bg-primary profile">
                      <div className="card-body px-4 py-4">
                        <div className="mb-4 mx-2 mx-md-5">
                          <img
                            className="img-fluid rounded-circle"
                            src={profile5}
                          />
                        </div>
                        <h5 className="fw-bold text-light">Bao Nguyen</h5>
                        <div className="text-light">Backend Developer</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 order-1 order-lg-2">
                <div className="ms-lg-5 mb-5">
                  <h2 className="display-5 fw-bold mb-3 mb-xl-5">
                    Meet the Team
                  </h2>
                  <p className="lead">
                    A dynamic group of Computer Science enthusiasts who eat,
                    sleep, and breathe programming. Each member brings a unique
                    set of skills, creativity, and passion to the table, making
                    our collaboration an exciting journey.
                  </p>
                  <p className="lead">
                    &quot;Welcome to the AsianDEXmurphy, have a look around
                    <br /> Anything that brain of yours can think of can be
                    found
                    <br /> We&apos;ve got mountains of features, some better,
                    some worse
                    <br />
                    If none of it&apos;s of interest to you, your
                    information&apos;d be the first&quot;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* END OF ABOUT US */}
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
                      What&apos;s is Crypto Wallet ?
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
                      phrase, as it&apos;s crucial for accessing your funds.
                      Once your account is set up, you can deposit
                      cryptocurrencies and start trading on the platform.
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
};

export default Home;
