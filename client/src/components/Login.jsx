// import
import { useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import "./css/style.css";
import rainbow from "../components/assets/rainbow-icon.png";
import metamask from "../components/assets/metamask.jpg";
import trustwallet from "../components/assets/trustwallet.jpg";
import walletconnect from "../components/assets/wallet-connect-logo.png";
import detectEthereumProvider from "@metamask/detect-provider";
import { useEffect } from "react";

const Login = (props) => {
  useEffect(() => {
    fetch("https://decentralized-trading-platform.onrender.com/verify", {
      method: "POST",
    })
      .then((r) => r.json())
      .then((r) => {
        if (r.message === "success") {
          navigate("/profile");
        } else {
          return;
        }
      });
    // const token = localStorage.getItem("token");

    // if (token) {
    //   navigate("/profile");
    //   console.log("navigated");
    // } else {
    //   return;
    // }

    //  Check if Any Web3 Provider is installed
    const getProvider = async () => {
      const provider = await detectEthereumProvider({ silent: true });
      setHasProvider(Boolean(provider));
    };

    // Call Provider Check Function
    getProvider();
  });
  const navigate = useNavigate();
  // const [isLoginForm, setIsLoginForm] = useState(true);

  //  Setting up useState for username, password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // const [regUsername, setRegUsername] = useState("");
  // const [regPwd, setRegPwd] = useState("");

  //  Set Error
  const [error, setError] = useState("");
  // const [registerError, setRegisterError] = useState("");
  // Login state
  // const [isLoggedIn] = useState(false);

  //  Set Provider
  const [hasProvider, setHasProvider] = useState(null); //  Has Provider need a place to show msg; If (hasProvier) =>  don't show toast ; else Show toast and tell them to install Metamask

  // Switch between Login and Register
  // const handleToggle = () => {
  //   setIsLoginForm(!isLoginForm);
  // };

  // Handle login
  const handleSubmit = async (e) => {
    e.preventDefault();

    //validation
    setError("");
    if (!/^[a-zA-Z0-9]+$/.test(username)) {
      setError(
        "Login username can only contain alphabetical letters and numbers."
      );
      return;
    }

    if (!/^[a-zA-Z0-9!@#$%^&*]+$/.test(password)) {
      setError(
        "Password can only contain alphabetical letters, numbers and !@#$%^&*"
      );
      return;
    }

    // if ((password) != (repeatPwd)) {
    //   setError('Repeat password must be the same as password');
    //   return;
    // }

    logIn();
  };

  // const handleRegister = async (e) => {
  //   e.preventDefault();

  //   register();
  // };

  const logIn = () => {
    fetch("https://decentralized-trading-platform.onrender.com/authenticate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((r) => r.json()) // r.json()
      .then((r) => {
        if ("success" === r.message) {
          localStorage.setItem("user", username);
          localStorage.setItem("token", r.token);
          props.setIsLoggedIn(true);
          navigate("/profile");
        } else {
          setError("Wrong username or password.");
        }
      });
  };

  // const register = () => {
  //   fetch("/register", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ regUsername, regPwd }),
  //   })
  //     .then((r) => r.json())
  //     .then((r) => {
  //       if ("200" === r.status) {
  //         console.log(r.status);
  //         navigate("/login");
  //       } else if (r.status === "404") {
  //         setRegisterError(r.message);
  //       } else {
  //         setRegisterError("An error had occured.");
  //       }
  //     });
  // };

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

  // Render page
  return (
    <div>
      <section className="vh-1000 bg-image">
        <div className="mask d-flex align-items-center h-100 gradient-custom-3">
          <div className="container h-100">
            <div className="row d-flex align-items-center h-100">
              <div className="col-sm-12 col-md-12 col-lg-6 mb-5 mt-5">
                {/* LOGIN FORM */}
                <div className="card login-bg" style={{ borderRadius: "15px" }}>
                  <div className="card-body p-5">
                    <h2 className="text-uppercase text-center mb-4">Login</h2>

                    <form onSubmit={handleSubmit}>
                      <div className="form-outline mb-3">
                        <input
                          onChange={(e) => setUsername(e.target.value)}
                          type="text"
                          id="name"
                          name="username"
                          className="form-control form-control-lg"
                          autoFocus
                        />
                        <label className="form-label" htmlFor="name">
                          Your Name
                        </label>
                      </div>

                      <div className="form-outline mb-3">
                        <input
                          onChange={(e) => setPassword(e.target.value)}
                          type="password"
                          id="password"
                          name="password"
                          className="form-control form-control-lg"
                        />
                        <label className="form-label" htmlFor="password">
                          Password
                        </label>
                      </div>
                      {/* LOGIN BUTTON */}
                      <div className="d-flex justify-content-center">
                        <button
                          type="submit"
                          className="btn btn-outline-primary my-2 my-sm-2 btn-lg login"
                        >
                          Login
                        </button>
                      </div>

                      {error && (
                        <div style={{ color: "red", textAlign: "center" }}>
                          {error}
                        </div>
                      )}
                      <p className="text-center text-light mt-4 mb-0 ">
                        Don&apos;t have an account?
                        <a
                          // href="#register"
                          className="direct-link"
                          // onClick={handleToggle}
                        >
                          <u>
                            {/* switch to register form */}
                            <Link to="/register" className="direct-link">
                              Register here
                            </Link>
                          </u>
                          {/* SWITCH TO LOGIN FORM */}
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
                          <span className="badge badge-danger">
                            Soon
                          </span>
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
                          <span className="badge badge-danger">
                            Soon
                          </span>
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
                          <span className="badge badge-danger">
                            Soon
                          </span>
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
              <div className="col-sm-12 col-md-12 col-lg-12 mb-5 mt-5">
                <h2>*Please log in and connect your wallet to proceed</h2>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Login;
