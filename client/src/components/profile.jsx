// import
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./css/style.css";
import profile_pic from "../components/assets/profile.png";
import LoadingScreen from "./loading";
import detectEthereumProvider from "@metamask/detect-provider";


import { formatBalance } from "./utils/formatBalance";
import { formatChainAsNum } from "./utils/formatChainID";


// PASS Username key and login state from Local Storage

// const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

const Profile = (props) => {
  const [firstRender, setFirsRender] = useState(true);

  //  Initial Wallet State
  const initialState = {
    accounts: [],
    balance:"",
    chainID:"",
  };

  // Wallet Information
  const [wallet, setWallet] = useState(initialState);

  //  Web3 Provider
  const [hasProvider,setHasProvider] = useState(null);  //  Has Provider need a place to show msg; If (hasProvier) =>  don't show toast ; else Show toast and tell them to install Metamask
  const { isLoggedIn } = props;
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const username = localStorage.getItem('user');
        fetch('/retrieveProfile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({username}),
        })
        .then((r) => r.json())
        .then((r) => {
          console.log(r)
          setUserInfo(r)
        })

        // console.log(userInfo);
        // setUserInfo(userData.rows[0].json);

        // ACCESS user key in your JSON file
        // setUserData(data[localStorage.getItem("user")]); // Change to any user key in json file


      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };



    const refreshAccounts = (accounts) => {
      if(accounts.length > 0){
        updateWallet(accounts);
      } else{
        //  If accounts length <= 0, user is disconnected (Can implement require user to reconnect with their wallet or not)
        setWallet(initialState)
      }
    }

    //  Refresh Chain
    const refreshChain = (chainId) => {
      setWallet((wallet) => ({ ...wallet, chainId }));
  };

    const getProvider = async () => {
      const provider = await detectEthereumProvider({ silent: true });
      setHasProvider(Boolean(provider));

      if (provider) {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        refreshAccounts(accounts);
        window.ethereum.on("accountsChanged", refreshAccounts);
        window.ethereum.on("chainChanged", refreshChain); /* New */
        }
      };
    
    if (firstRender) {
      fetchData();
      getProvider();
      setFirsRender(false);
    }
  }, [firstRender, userInfo]);


  
  const updateWallet = async (accounts) => {
      const balance = formatBalance(
          await window.ethereum.request({             
              method: "eth_getBalance",               
              params: [accounts[0], "latest"],         
          })
      );                                                
      const chainId = await window.ethereum.request({  
          method: "eth_chainId",                     
      });                                              
      setWallet({ accounts, balance, chainId });        
  };


  // Wait for userData before render
  if (!userInfo || !isLoggedIn) {
    return <LoadingScreen />;
  }

  // Check if user is logged in
  // If logged in, render the profile
  return (
    <section className="profile-page">
      {/* INCASE THE PAGE RENDERED BEFORE IT COULD READ userData, this will reader a loading page */}
      <div className="container py-5">
        <div className="row">
          {/* Right section */}
          <div className="col-lg-4">
            <div className="card mb-4">
              <div className="card-body text-center">
                <img
                  src={profile_pic}
                  alt="avatar"
                  className="rounded-circle img-fluid"
                  style={{ width: "150px" }}
                ></img>
                <h5 className="my-3">{userInfo.username}</h5>
                <p className="text-muted mb-1">User#000</p>
                <p className="text-muted mb-4">Kivotos, BA</p>
                <h5 className="text-muted mb-4">
                  Balance: {wallet.balance} ETH
                </h5>
              </div>
            </div>
          </div>
          {/* Left section */}
          <div className="col-lg-8">
            <div className="card mb-4">
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Username</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{localStorage.getItem("user")}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Email</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{userInfo.useremail}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Phone</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">0912345678</p>
                  </div>
                </div>
                <hr />

                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Wallet Address</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{wallet.accounts[0]}</p> {/* Improvement needed for when user have multiple Accounts*/}
                  </div>
                </div>
                <hr />
                {/*History Transaction Link */}
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Transaction History</p>
                  </div>
                  <div className="col-sm-9">
                    <Link
                      to={{
                        pathname: "/transactionHistory",
                      }}
                    >
                      Show History
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Profile;
