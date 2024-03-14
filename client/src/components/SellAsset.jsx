// import
import "./css/style.css";
import { useState, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";
import LoadingScreen from "./loading";
import detectEthereumProvider from "@metamask/detect-provider";
import { formatBalance } from "./utils/formatBalance";
import Web3 from 'web3';

// PASS Username key and login state from Local Storage

function SellAsset(props) {
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

  //  Asset Name
  const [assetName, setAssetName] = useState('');

  //  Asset Description
  const [assetDesc, setAssetDesc] = useState('');

  //  Asset Price
  const [assetPrice,setAssetPrice] = useState('');


  //  Web 3 Instance
  const [web3, setWeb3] = useState({});

        //  Set Contract
        let contractAddress = '0x0Af64453375966Ed7E6deb57D81B400cCa997a03';
        let contractABI = [
          {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address"
              },
              {
                "indexed": false,
                "internalType": "uint256",
                "name": "itemId",
                "type": "uint256"
              },
              {
                "indexed": false,
                "internalType": "string",
                "name": "name",
                "type": "string"
              },
              {
                "indexed": false,
                "internalType": "uint256",
                "name": "price",
                "type": "uint256"
              }
            ],
            "name": "ItemCreated",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "internalType": "address",
                "name": "buyer",
                "type": "address"
              },
              {
                "indexed": false,
                "internalType": "uint256",
                "name": "itemId",
                "type": "uint256"
              },
              {
                "indexed": false,
                "internalType": "string",
                "name": "name",
                "type": "string"
              }
            ],
            "name": "ItemPurchased",
            "type": "event"
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "name": "assetOwners",
            "outputs": [
              {
                "internalType": "address payable",
                "name": "ownerAddress",
                "type": "address"
              }
            ],
            "stateMutability": "view",
            "type": "function",
            "constant": true
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "name": "digitalAssets",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "name",
                "type": "string"
              },
              {
                "internalType": "uint256",
                "name": "price",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "purchased_time",
                "type": "uint256"
              }
            ],
            "stateMutability": "view",
            "type": "function",
            "constant": true
          },
          {
            "inputs": [],
            "name": "owner",
            "outputs": [
              {
                "internalType": "address",
                "name": "",
                "type": "address"
              }
            ],
            "stateMutability": "view",
            "type": "function",
            "constant": true
          },
          {
            "stateMutability": "payable",
            "type": "receive",
            "payable": true
          },
          {
            "inputs": [
              {
                "internalType": "string",
                "name": "_name",
                "type": "string"
              },
              {
                "internalType": "uint256",
                "name": "_priceInWei",
                "type": "uint256"
              }
            ],
            "name": "setDigitalAsset",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "_itemId",
                "type": "uint256"
              }
            ],
            "name": "getItemCurrentOwner",
            "outputs": [
              {
                "components": [
                  {
                    "internalType": "address payable",
                    "name": "ownerAddress",
                    "type": "address"
                  }
                ],
                "internalType": "struct DigitalAssets.Owner",
                "name": "",
                "type": "tuple"
              }
            ],
            "stateMutability": "view",
            "type": "function",
            "constant": true
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "_itemId",
                "type": "uint256"
              }
            ],
            "name": "getItemAllOwner",
            "outputs": [
              {
                "internalType": "address[]",
                "name": "",
                "type": "address[]"
              }
            ],
            "stateMutability": "view",
            "type": "function",
            "constant": true
          },
          {
            "inputs": [],
            "name": "getBalance",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "stateMutability": "view",
            "type": "function",
            "constant": true
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "_itemId",
                "type": "uint256"
              }
            ],
            "name": "purchaseAsset",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function",
            "payable": true
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "_amount",
                "type": "uint256"
              }
            ],
            "name": "withdrawFunds",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          }
        ];

  const {isLoggedIn} = props

  useEffect(() => {

    //  Change this to Khoa's Token Check
    // const fetchData = async () => {
    //   try {
    //     const response = await fetch("/data/fake_user.json");
    //     const data = await response.json();

    //     // ACCESS user key in your JSON file
    //     setUserData(data[localStorage.getItem("user")]); // Change to any user key in json file
    //     console.log(userData);
    //   } catch (error) {
    //     console.error("Error fetching user data:", error);
    //   }
    // };


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


  const handlePriceChange = (e) => {
    setAssetPrice(e.target.value);
  }

  const handleNameChange = (e) =>{
    setAssetName(e.target.value);
  }

  const handleAssetDesc = (e) =>{
    setAssetDesc(e.target.value);
  }


  const handleSubmit = (e) => {
    e.preventDefault();


    sellAsset();
  }


  const sellAsset = async () => {
    if(window.ethereum){

         //  Create a Smart Contract Instance
         var myContract = new web3.eth.Contract(contractABI,contractAddress);

        //  Convert Ether into Wei
        const amountInWei = web3.utils.toWei(assetPrice,'ether');

        //  Call Sell Asset
        try{
            await myContract.methods.setDigitalAsset(assetName,amountInWei).send({
                from: wallet.accounts[0],
                gas: 2000000    // Adjust Gas Limit
            })
            .on('ItemCreate', (item) => {
                console.log("Item: ", item);
            })
        } catch(error){
            console.error("Error:", error);
        }
    }
  }

  // Wait for userData before render
//   if (!userData) {
//     return (
//       <LoadingScreen/>
//     );
//   }
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
                  <p className="h3 text-center py-3">Sell Your Asset</p>
                </div>
              </div>

              <div className="row gx-3">
                <div className="col-sm-12 col-md-12 col-lg-12">
                  <div className="d-flex flex-column">
                    <label htmlFor="user_wallet" className="text mb-1">
                      Your asset name
                    </label>
                    <input
                    onChange={handleNameChange}
                      className="form-control mb-3"
                      id="user_wallet"
                      name="user_wallet"
                      type="text"
                      placeholder="Asset Name"
                    />
                  </div>
                </div>

                <div className="col-sm-12 col-md-12 col-lg-12">
                  <div className="d-flex flex-column">
                    <label htmlFor="asset_desc" className="text mb-1">
                      Asset Description
                    </label>
                    <input
                    onChange={handleAssetDesc}
                      className="form-control mb-3"
                      id="asset_desc"
                      name="asset_desc"
                      type="text"
                      placeholder="Asset Name"
                    />
                  </div>
                </div>

                <div className="col-sm-12 col-md-12 col-lg-12">
                  <div className="d-flex flex-column">
                    <label className="text mb-1" htmlFor="price">
                      Price you want to sell:
                    </label>
                    <input
                    onChange={handlePriceChange}
                      className="form-control mb-3"
                      type="text"
                      id="price"
                      name="price"
                      placeholder="0.00 ETH"
                    />
                  </div>
                </div>
    
                <div className="col-12">
                  <button type="submit" className="btn btn-outline-light mb-3">
                    <span className="ps-2">
                      <strong>Sell </strong>
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
export default SellAsset;
