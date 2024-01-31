// import
import './css/login.css'
import rainbow from '../components/assets/rainbow-icon.png'
import metamask from '../components/assets/metamask.jpg'
import trustwallet from '../components/assets/trustwallet.jpg'
import walletconnect from '../components/assets/wallet-connect-logo.png'

function Login() {
    return (
        <div>
              
          <section className="vh-100 bg-image">
            <div className="mask d-flex align-items-center h-100 gradient-custom-3">
              <div className="container h-100">
                <div className="row d-flex align-items-center h-100">
                  <div className="col-12 col-md-9 col-lg-7 col-xl-6 overflow-hidden mb-5">
                    <div className="card login-bg" style={{ borderRadius: '15px' }}>
                      <div className="card-body p-5">
                        <h2 className="text-uppercase text-center mb-4">Login</h2>

                        <form method="post" action="http://mercury.swin.edu.au/it000000/cos10005/formtest.php">

                          <div className="form-outline mb-3">
                            <input type="text" id="name" name="username" className="form-control form-control-lg" autoFocus/>
                            <label className="form-label" htmlFor="name">Your Name</label>
                          </div>

                          <div className="form-outline mb-3">
                            <input type="password" id="password" name="password" className="form-control form-control-lg" />
                            <label className="form-label" htmlFor="password">Password</label>
                          </div>

                          <div className="d-flex justify-content-center">
                            <button type="submit" className="btn btn-outline-primary my-2 my-sm-2 btn-lg login">Login</button>
                          </div>

                          <p className="text-center text-light mt-4 mb-0 ">Don't have an account? 
                          <a href="#register" className="direct-link"><u>Register here</u></a>
                          </p>
                        </form>
                      </div>

                    </div>
                  </div>

                  <div className="col-12 col-md-9 col-lg-7 col-xl-6 overflow-hidden mb-5">
                  <div className="card login-bg" style={{ borderRadius: '15px' }}>
                      <div className="card-body p-5">
                        <h2 className="text-uppercase text-center mb-4">Connect a Wallet</h2>

                          <div className="form-outline mb-3">
                            <button className="wallet-item">
                              <div>
                                <img src={metamask} className='logo'></img> MetaMask
                              </div>
                              </button>
                          </div>

                          <div className="form-outline mb-3">
                            <button className="wallet-item">
                              <div>
                                <img src={rainbow} className='logo'></img> Rainbow
                                </div>
                            </button>
                          </div>

                          <div className="form-outline mb-3">
                            <button className="wallet-item">
                              <div>
                                <img src={walletconnect} className='logo'></img> WalletConnect
                              </div>
                            </button>
                          </div>

                          <div className="form-outline mb-3">
                            <button className="wallet-item">
                              <div>
                                <img src={trustwallet} className='logo'></img> TrustWallet
                              </div>
                            </button>
                          </div>

                          <div className="d-flex justify-content-center">
                            <p className="text-center text-light mt-2 mb-0">Don't have a wallet?</p>
                          </div>

                          <div className="d-flex justify-content-center">
                            <button className="btn my-2 my-sm-2 btn-lg get-wallet">Get a Wallet</button>
                          </div>

                          <div className="d-flex justify-content-center">
                            <p className="text-center text-light mt-4 mb-0">By connecting wallet you agree to the <a href='#terms' className="direct-link">Terms of Service</a> and <a href='#policy' className="direct-link">Privacy Policy</a></p>
                          </div>
                      </div>

                    </div>
                  </div>

                </div>
              </div>
            </div>
          </section>
        </div>
    )

}
export default Login