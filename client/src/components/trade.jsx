// import
import "./css/style.css";
import { useState, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";
import LoadingScreen from "./loading";
import detectEthereumProvider from "@metamask/detect-provider";
import { formatBalance } from "./utils/formatBalance";
import Web3 from 'web3';

// PASS Username key and login state from Local Storage

function Trade(props) {
  const [userData, setUserData] = useState([]);
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

  //  Target Address
  const [targetAddress, setTargetAddress] = useState('');

  //  Transaction Amount
  const [amount,setAmount] = useState('');


  //  Web 3 Instance
  const [web3, setWeb3] = useState({});

  const {isLoggedIn} = props

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data/fake_user.json");
        const data = await response.json();

        // ACCESS user key in your JSON file
        setUserData(data[localStorage.getItem("user")]); // Change to any user key in json file
        console.log(userData);
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
        window.ethereum.on("chainChanged", refreshChain); 
        }


      };

    //  Web 3 Init
    const initWeb3 = async () =>{
      if(window.ethereum){
        try{
          await window.ethereum.request({method: 'eth_requestAccounts'});
          const Web3Instance = new Web3(window.ethereum);
          setWeb3(Web3Instance);
        } catch(error){
          console.error("User Denied Account Access", error);
        }
      } else{
        console.log("There is no Web 3 Instance Injected.");
      }
    }
      

    if (firstRender) {
      fetchData();
      getProvider();
      initWeb3();
      setFirsRender(false);
    }
  }, [firstRender, userData]);


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


  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  }

  const handleAddressChange = (e) =>{
    setTargetAddress(e.target.value);
  }


  const handleSubmit = (e) => {
    e.preventDefault();


    transactionExecute();
  }


  const transactionExecute = async () => {
    if(window.ethereum){

      //  Convert Ether into Wei
      const amountInWei = web3.utils.toWei(amount,'ether');

      try{
        //  Transfer Ethereum Directly
        const result = await web3.eth.sendTransaction()
        .send({
          from: wallet.accounts[0],
          to:targetAddress,
          value: amountInWei,
        })
        .on('receipt', (receipt) => {
          console.log('Transaction Receipt',receipt);
        })
        console.log('Result:', result);
      } catch (error) {
        console.error('Error Sending Ethereum', error);
      }
    }
  }

  // Wait for userData before render
  if (!userData) {
    return (
      <LoadingScreen/>
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
              onSubmit={handleSubmit}
            >
              <div className="row py-3">
                <div className="col-sm-12 col-md-12 col-lg-9">
                  <p className="h3 text-center py-3">Payment Details</p>
                </div>
                <div className="col-sm-12 col-md-12 col-lg-3 card py-1">
                  <p className="h5 mb-1 mb-xl-1">Your Balance:</p>
                  <p className="h5 mb-1 mb-xl-1">{wallet.balance}</p>
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
                      value={wallet.accounts[0]}
                    />
                  </div>
                </div>
                <div className="col-sm-12 col-md-12 col-lg-12">
                  <div className="d-flex flex-column">
                    <label className="text mb-1" htmlFor="target_wallet">
                      Wallet address you want to send:
                    </label>
                    <input onChange={handleAddressChange}
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
                    <input onChange={handleAmountChange}
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
