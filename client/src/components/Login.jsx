// import
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/style.css";
import rainbow from "../components/assets/rainbow-icon.png";
import metamask from "../components/assets/metamask.jpg";
import trustwallet from "../components/assets/trustwallet.jpg";
import walletconnect from "../components/assets/wallet-connect-logo.png";
import { useEffect } from "react";



// import axios from 'axios' (will use if have api endpoint)

const Login = (props) => {
  useEffect(() => {
    const token = localStorage.getItem("token")

    if (token) {
      navigate('/profile')
    } else {
      return;
    }
  })
  const navigate = useNavigate();
  const [isLoginForm, setIsLoginForm] = useState(true);

  //  Setting up useState for username, password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //  Set Error
  const [error, setError] = useState("");
  // Login state
  // const [isLoggedIn] = useState(false);

  // Switch between Login and Register
  const handleToggle = () => {
    setIsLoginForm(!isLoginForm);
  };

  // Handle login
  const handleSubmit = async (e) => {
    e.preventDefault();

    logIn();

    
    // try {
    //   const res = await fetch("/data/fake_user.json");
    //   const data = await res.json();
    //   console.log(data[username]);

    //   const user = data[username];

    //   if (user && user.password === password) {
    //     console.log("Login successful!");
    //     console.log(username);
    //     setError("");
    //     // PASS THIS VARIABLE STATUS TO OTHER PAGES SO USERS DONT GET LOGGED OUT WHEN SWITCHING TAB

    //     //  REDIRECT USER TO PROFILE PAGE
    //     // localStorage.removeItem("isLoggedIn");

    //     // PUSH username key and login state to localstorage
    //     localStorage.setItem("username", username);
    //     localStorage.setItem("isLoggedIn", "true");

    //     // Redirect to the profile page
    //     navigate("/profile");
    //   } else {
    //     // Authentication failed
    //     console.error("Login failed");
    //     setError("Invalid username or password");
    //   }
    // } catch (fetchError) {
    //   console.error("Error fetching data:", fetchError);
    // }
  };

  const logIn = () => {
    fetch('/authenticate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({username, password}),   
    }) 
      .then((r) => r.json()) // r.json()
      .then((r) => {
        if ('success' === r.message) {
          localStorage.setItem("user", username);
          localStorage.setItem("token", r.token);
          props.setIsLoggedIn(true);
          navigate("/profile")
        } else {
          window.alert('Wrong email or password')
        }
      })
    };

  // Render page
  return (
    <div>
      <section className="vh-1000 bg-image">
        <div className="mask d-flex align-items-center h-100 gradient-custom-3">
          <div className="container h-100">
            <div className="row d-flex align-items-center h-100">
              <div className="col-sm-12 col-md-12 col-lg-6 mb-5 mt-5">
                {isLoginForm ? (
                  <>
                    {/* LOGIN FORM */}
                    <div
                      className="card login-bg"
                      style={{ borderRadius: "15px" }}
                    >
                      <div className="card-body p-5">
                        <h2 className="text-uppercase text-center mb-4">
                          Login
                        </h2>

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
                              href="#register"
                              className="direct-link"
                              onClick={handleToggle}
                            >
                              <u>Register here</u>
                              {/* SWITCH TO LOGIN FORM */}
                            </a>
                          </p>
                        </form>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* REGISTER FORM */}
                    <div
                      className="card login-bg"
                      style={{ borderRadius: "15px" }}
                    >
                      <div className="card-body p-5">
                        <h2 className="text-uppercase text-center mb-4">
                          Create an account
                        </h2>

                        <form
                          method="post"
                          // FORM ENDPOINT
                          action="http://mercury.swin.edu.au/it000000/cos10005/formtest.php"
                        >
                          <div className="form-outline mb-3">
                            <input
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
                          {/* Gender */}
                          <div className="form-outline mb-3">
                            <label className="form-label">Gender</label>
                            <div className="form-check form-check-inline">
                              <input
                                className="form-check-input"
                                id="genderf"
                                type="radio"
                                name="gender"
                                value="female"
                              ></input>
                              <label
                                className="form-check-label"
                                htmlFor="genderf"
                              >
                                Female
                              </label>
                            </div>

                            <div className="form-check form-check-inline">
                              <input
                                className="form-check-input"
                                id="genderm"
                                type="radio"
                                name="gender"
                                value="male"
                              ></input>
                              <label
                                className="form-check-label"
                                htmlFor="genderm"
                              >
                                Male
                              </label>
                            </div>
                          </div>
                          {/* GENDER */}
                          <div className="form-outline mb-3">
                            <input
                              type="email"
                              id="email"
                              name="email"
                              className="form-control form-control-lg"
                            ></input>
                            <label className="form-label" htmlFor="email">
                              Your Email
                            </label>
                          </div>

                          <div className="form-outline mb-3">
                            <input
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
                              type="password"
                              id="password"
                              name="password"
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

                          <p className="text-center text-light mt-4 mb-0 ">
                            Already have an account?
                            <a
                              href="#login"
                              className="direct-link"
                              onClick={handleToggle}
                            >
                              <u>Login</u>
                            </a>
                          </p>
                        </form>
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="col-sm-12 col-md-12 col-lg-6 mb-5 mt-5">
                <div className="card login-bg" style={{ borderRadius: "15px" }}>
                  <div className="card-body p-4">
                    <h2 className="text-uppercase text-center mb-4">
                      Connect a Wallet
                    </h2>

                    <div className="form-outline mb-3">
                      <button className="wallet-item">
                        <div className="wallet-name">
                          <img
                            src={metamask}
                            className="logo"
                            alt="metamask"
                          ></img>{" "}
                          MetaMask
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
                          Rainbow
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
                          WalletConnect
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
                          TrustWallet
                        </div>
                      </button>
                    </div>

                    <div className="d-flex justify-content-center">
                      <p className="text-center text-light mt-2 mb-0">
                        Don&apos;t have a wallet?
                      </p>
                    </div>

                    <div className="d-flex justify-content-center">
                      <button className="btn my-2 my-sm-2 btn-lg get-wallet">
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
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default Login;
