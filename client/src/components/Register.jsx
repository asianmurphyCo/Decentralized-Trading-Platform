import { useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import "./css/style.css";
import rainbow from "../components/assets/rainbow-icon.png";
import metamask from "../components/assets/metamask.jpg";
import trustwallet from "../components/assets/trustwallet.jpg";
import walletconnect from "../components/assets/wallet-connect-logo.png";

const Register = () => {
  const navigate = useNavigate();
  const [regUsername, setRegUsername] = useState("");
  const [regPwd, setRegPwd] = useState("");
  const [regRepeat, setRegRepeat] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [regUsernameError, setRegUsernameError] = useState("");
  const [regPwdError, setRegPwdError] = useState("");

  const [hasProvider, setHasProvider] = useState(null); //  Has Provider need a place to show msg; If (hasProvier) =>  don't show toast ; else Show toast and tell them to install Metamask
  
  const handleRegister = async (e) => {
    e.preventDefault();

    setRegisterError("");
    setRegUsernameError("");
    setRegPwdError("");

    if (!/^[a-zA-Z0-9]+$/.test(regUsername)) {
      setRegUsernameError(
        "Login username can only contain alphabetical letters and numbers."
      );
      return;
    }

    if (!/^[a-zA-Z0-9!@#$%^&*]+$/.test(regPwd)) {
      setRegPwdError(
        "Password can only contain alphabetical letters, numbers and !@#$%^&*"
      );
      return;
    }

    if (!/^[a-zA-Z0-9!@#$%^&*]+$/.test(regRepeat)) {
      setRegPwdError(
        "Password can only contain alphabetical letters, numbers and !@#$%^&*"
      );
      return;
    }

    if(regRepeat !== regPwd) {
      setRegPwdError("Passwords do not match.");
      return;
    }

    register();
  };

  //  Connection to Metamask Wallet
  const connectMetaMask = async () => {
    try {
      const acc = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("Connected to your Metamask Wallet"); //   Can show toast to notify that wallet has been connected
      console.log(acc[0]);
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
    }
  };

  // CHECK REGISTER
  const register = () => {
    fetch("/registerAPI", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ regUsername, regPwd }),
    })
      .then((r) => r.json())
      .then((r) => {
        if ("200" === r.status) {
          console.log(r.status);
          navigate("/login");
        } else if (r.status === "404") {
          setRegisterError(r.message);
        } else {
          setRegisterError("An error had occured.");
        }
      });
  };
  // Render page
  return (
    <div>
      <section className="vh-1000 bg-image">
        <div className="mask d-flex align-items-center h-100 gradient-custom-3">
          <div className="container h-100">
            <div className="row d-flex align-items-center h-100">
              <div className="col-sm-12 col-md-12 col-lg-6 mb-5 mt-5">
                {/* REGISTER FORM */}
                <div className="card login-bg" style={{ borderRadius: "15px" }}>
                  <div className="card-body p-5">
                    <h2 className="text-uppercase text-center mb-4">
                      Create an account
                    </h2>

                    <form
                      onSubmit={handleRegister}
                    >
                      <div className="form-outline mb-3">
                        <input
                          onChange={(e) => setRegUsername(e.target.value)}
                          type="text"
                          id="name"
                          name="username"
                          className="form-control form-control-lg"
                          autoFocus
                        />
                        <label className="form-label" htmlFor="name">
                          Username
                        </label>
                      </div>
                      {/* GENDER*/}

                      {/* EMAIL */}

                      <div className="form-outline mb-3">
                        <input
                          onChange={(e) => setRegPwd(e.target.value)}
                          type="password"
                          id="password"
                          name="password"
                          className="form-control form-control-lg"
                        />
                        <label className="form-label" htmlFor="password">
                          Password
                        </label>
                      </div>

                      <div className="form-outline mb-3">
                        <input
                          onChange={(e) => setRegRepeat(e.target.value)}
                          type="password"
                          id="repeatpassword"
                          name="repeatepassword"
                          className="form-control form-control-lg"
                        />
                        <label className="form-label" htmlFor="password">
                          Repeat password
                        </label>
                      </div>

                      <div className="form-check d-flex justify-content-center mb-3">
                        <input
                          className="form-check-input me-1"
                          type="checkbox"
                          name="term_service"
                          id="term_service"
                          required
                        ></input>
                        <label
                          className="form-check-label"
                          htmlFor="term_service"
                        >
                          I agree all statements in{" "}
                          <a href="#!" className="direct-link">
                            <u>Terms of service</u>
                          </a>
                        </label>
                      </div>
                      {/* SWITCH BACK TO LOGIN FORM */}
                      <div className="d-flex justify-content-center">
                        <button
                          type="submit"
                          className="btn btn-outline-primary my-2 my-sm-2 btn-lg login"
                        >
                          Sign up
                        </button>
                      </div>
                      {regPwdError && (
                        <div style={{ color: "red", textAlign: "center" }}>
                          {regPwdError}
                        </div>
                      )}

                      {regUsernameError && (
                        <div style = {{color: "red", textAlign: "center"}}>{regUsernameError}</div>
                      )}

                      {registerError && (
                        <div style = {{color: "red", textAlign: "center"}}>{registerError}</div>
                      )}

                      <p className="text-center text-light mt-4 mb-0 ">
                        Already have an account?
                        <a
                          //   href="#login"
                          className="direct-link"
                          // onClick={handleToggle}
                        >
                          <u>
                            {/* Switch back to login form */}
                            <Link to="/login" className="direct-link">
                              Login
                            </Link>
                          </u>
                        </a>
                      </p>
                    </form>
                  </div>
                </div>
              </div>

              <div className="col-sm-12 col-md-12 col-lg-6 mb-5 mt-5">
                <div className="card login-bg" style={{ borderRadius: "15px" }}>
                  <div className="card-body p-4">
                    <h2 className="text-uppercase text-center mb-4">
                      Connect a Wallet
                    </h2>

                    <div className="form-outline mb-3">
                      <button onClick={connectMetaMask} className="wallet-item">
                        <div className="wallet-name">
                          <img
                            src={metamask}
                            className="logo"
                            alt="metamask"
                          ></img>{" "}
                          MetaMask&nbsp;
                          <span className="badge badge-success">New</span>
                        </div>
                      </button>
                    </div>

                    <div className="form-outline mb-3">
                      <button className="wallet-item">
                        <div className="wallet-name">
                          <img
                            src={rainbow}
                            className="logo"
                            alt="rainbow"
                          ></img>{" "}
                          Rainbow&nbsp;
                          <span className="badge badge-danger">Soon</span>
                        </div>
                      </button>
                    </div>

                    <div className="form-outline mb-3">
                      <button className="wallet-item">
                        <div className="wallet-name">
                          <img
                            src={walletconnect}
                            className="logo"
                            alt="wallet connect"
                          ></img>{" "}
                          WalletConnect&nbsp;
                          <span className="badge badge-danger">Soon</span>
                        </div>
                      </button>
                    </div>

                    <div className="form-outline mb-3">
                      <button className="wallet-item">
                        <div className="wallet-name">
                          <img
                            src={trustwallet}
                            className="logo"
                            alt="trustwallet"
                          ></img>{" "}
                          TrustWallet&nbsp;
                          <span className="badge badge-danger">Soon</span>
                        </div>
                      </button>
                    </div>

                    <div className="d-flex justify-content-center">
                      <p className="text-center text-light mt-2 mb-0">
                        Don&apos;t have a wallet?
                      </p>
                    </div>

                    <div className="d-flex justify-content-center">
                      <button
                        className="btn my-2 my-sm-2 btn-lg get-wallet"
                        href="https://metamask.io/download/"
                      >
                        Get a Wallet
                      </button>
                    </div>

                    <div className="d-flex justify-content-center">
                      <p className="text-center text-light mt-4 mb-0">
                        By connecting wallet you agree to the{" "}
                        <a href="#terms" className="direct-link">
                          Terms of Service
                        </a>{" "}
                        and{" "}
                        <a href="#policy" className="direct-link">
                          Privacy Policy
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* WARNING USER TO LOG IN ON BOTH PLATFORM */}
              <div className="col-sm-12 col-md-12 col-lg-12 mb-5 mt-5"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


export default Register;
