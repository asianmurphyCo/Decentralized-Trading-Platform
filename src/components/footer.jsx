// import
import "./css/style.css"

function Footer() {
  return (
    <footer className="text-center text-white">
      <section>
        <div className="container text-center text-md-start mt-5">
          <div className="row mt-3">
            {/* CONTENTS */}

            {/* ABOUT OUR GROUP */}
            <div className="col-md-6 col-lg-4 col-xl-3 mx-auto mb-4">
              <h6 className="fw-bold mb-4">AsianMurphy</h6>
              <p>
                Where your money will be lost due to our insecurity and
                irresponsibility
              </p>
            </div>

            {/* CONTACT INFOR */}
            <div className="col-md-6 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
              <p>
                <i className="fas fa-home me-3"></i> Kivotos, Blue Archive
              </p>
              <p>
                <i className="fas fa-envelope me-3"></i>
                arona@kivotos.edu.ba
              </p>
              <p>
                <i className="fas fa-phone me-3"></i> + 01 234 567 89
              </p>
            </div>
          </div>
        </div>
        {/* Copyright */}
      </section>
      <div className="text-center p-3 copy-right">
        © 2024 COS30049: &nbsp;
        <a
          className="text-white"
          href="https://github.com/asianmurphyCo/Decentralized-Trading-Platform"
        >
          AsianMurphy
        </a>
      </div>
    </footer>
  );
}
export default Footer;
