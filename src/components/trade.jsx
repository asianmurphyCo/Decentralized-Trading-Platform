// import
import "./css/style.css";
import { useState, useEffect } from "react";
import hertaload from "../components/assets/herta.webp";
import { FaArrowRight } from "react-icons/fa";

// PASS Username key and login state from Local Storage

function Trade() {
  const [userData, setUserData] = useState([]);
  const [firstRender, setFirsRender] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data/fake_user.json");
        const data = await response.json();

        // ACCESS user key in your JSON file
        setUserData(data[localStorage.getItem("username")]); // Change to any user key in json file
        console.log(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (firstRender) {
      fetchData();
      setFirsRender(false);
    }
  }, [firstRender, userData]);
  // Wait for userData before render
  if (!userData) {
    return (
      <section>
        <div className="mask d-flex align-items-center h-100 gradient-custom-3">
          <div className="container h-100">
            <div className="col-sm-12 col-md-12 col-lg-12 mb-5 mt-5">
              <div className="card login-bg">
                {/* DIRECT USER BACK TO LOGIN PAGE */}
                <img
                  className="w-30 mx-auto d-block"
                  src={hertaload}
                  alt="getout"
                  style={{ width: "20%" }}
                />
                <h1 className="text-center mb-4">Loading...</h1>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  // Check if user is logged in
  // If logged in, render the profile
  return (
    <section className="mask d-flex align-items-center">
      <div className="container p-5 vh-100">
        <div className="row justify-content-center">
          <div className="card col-12 col-md-8 col-lg-6 col-xl-5 px-4 bg-primary text-light">
            <form
              method="post"
              // FORM ENDPOINT
              action="http://mercury.swin.edu.au/it000000/cos10005/formtest.php"
            >
              <div className="row py-3">
                <div className="col-sm-12 col-md-12 col-lg-9">
                  <p className="h3 text-center py-3">Payment Details</p>
                </div>
                <div className="col-sm-12 col-md-12 col-lg-3 card py-1">
                  <p className="h5 mb-1 mb-xl-1">Your Balance:</p>
                  <p className="h5 mb-1 mb-xl-1">{userData.balance}</p>
                </div>
              </div>
              <div className="row gx-3">
                <div className="col-sm-12 col-md-12 col-lg-12">
                  <div className="d-flex flex-column">
                    <label htmlFor="user_wallet" className="text mb-1">
                      Your wallet address:
                    </label>
                    <input
                      className="form-control mb-3"
                      id="user_wallet"
                      name="user_wallet"
                      type="text"
                      placeholder="userWallet"
                      value={userData.wallet}
                    />
                  </div>
                </div>
                <div className="col-sm-12 col-md-12 col-lg-12">
                  <div className="d-flex flex-column">
                    <label className="text mb-1" htmlFor="target_wallet">
                      Wallet address you want to send:
                    </label>
                    <input
                      className="form-control mb-3"
                      type="text"
                      id="target_wallet"
                      name="target_wallet"
                      placeholder="******************************"
                    />
                  </div>
                </div>
                <div className="col-sm-12 col-md-12 col-lg-12">
                  <div className="d-flex flex-column">
                    <label htmlFor="amount" className="text mb-1">
                      Amount (ETH):
                    </label>
                    <input
                      className="form-control mb-3 pt-2"
                      type="number"
                      placeholder="0000"
                      id="amount"
                      name="amount"
                    />
                  </div>
                </div>
                <div className="col-12">
                  <button type="submit" className="btn btn-outline-light mb-3">
                    <span className="ps-2">
                      <strong>Create transaction </strong>
                    </span>
                    <span>
                      <FaArrowRight />
                    </span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Trade;
