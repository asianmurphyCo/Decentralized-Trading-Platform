// import
import "./css/style.css";
import { FaEnvelope } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";

function Footer() {
  return (
    <footer className="text-center text-white">
      <div className="container text-center text-md-start mt-5">
        <div className="row mt-3">
          {/* CONTENTS */}

          {/* ABOUT OUR GROUP */}
          <div className="col-md-12 col-lg-12 col-xl-4 mx-auto mb-4">
            <h6 className="fw-bold mb-4">AsianMurphy</h6>
            <p className="">
              Where your money will be lost due to our insecurity and
              irresponsibility
            </p>
          </div>

          {/* Communities */}
          <div className="col-md-12 col-lg-12 col-xl-4 mx-auto mb-md-0 mb-4">
            <div className="text-center mb-3">
              <h6 className="text-uppercase fw-bold mb-4">Connect with us</h6>
              <button
                data-mdb-ripple-init
                type="button"
                className="btn text-light btn-floating mx-1"
              >
                <FaFacebook className="display-6" />
              </button>

              <button
                data-mdb-ripple-init
                type="button"
                className="btn text-light btn-floating mx-1"
              >
                <FaLinkedin className="display-6" />
              </button>

              <button
                data-mdb-ripple-init
                type="button"
                className="btn text-light btn-floating mx-1"
              >
                <FaGithub className="display-6" />
              </button>
            </div>
          </div>
          {/* CONTACT INFOR */}
          <div className="col-md-12 col-lg-12 col-xl-4 mx-auto mb-md-0 mb-4 text-center">
            <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
            <p>
              <FaHome />
              &nbsp; Kivotos, Blue Archive
            </p>
            <p>
              <FaEnvelope />
              &nbsp; arona@kivotos.edu.ba
            </p>
            <p>
              <FaPhoneAlt />
              &nbsp; + 01 234 567 89
            </p>
          </div>
        </div>
      </div>
      {/* Copyright */}
      <div className="text-center p-3 copy-right">
        ©2024{" "}
        <a
          className="text-white"
          href="https://github.com/asianmurphyCo/Decentralized-Trading-Platform"
        >
          AsianMurphy
        </a>
        &nbsp;COS30049 - Computing Technology Innovation Project
      </div>
    </footer>
  );
}
export default Footer;
