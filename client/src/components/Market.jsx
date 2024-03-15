import "./css/style.css";
import { filterByCategory } from "./js/function";
import React, { useState, useEffect } from "react";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import { formatBalance } from "./utils/formatBalance";
import {useNavigate} from "react-router-dom";

const Market = () => {
  const [products, setProducts] = useState([]);
  const [buyButton, setBuyButton] = useState(false);
  const navigate = useNavigate()
  //let products = [];

  //  Get Username

  const username = localStorage.getItem("user");
  
  //  Initial Wallet State
   const initialState = {
    accounts:[],
    balance:"",
    chainID:"",
  };

    const [categoryFilter, setCategoryFilter] = useState("all");

    const handleFilter = (category) => {
      setCategoryFilter(category);
    };


  //  wallet Information
  const [wallet,setWallet] = useState(initialState);  

  //  Web3 Provider
  const [hasProvider,setHasProvider] = useState(null);   

    //  Transaction Amount
    const [amount,setAmount] = useState('');

    //  Web3 Instance
    const [web3,setWeb3] = useState({});

    //  Set Contract
    let contractAddress = '0x301362488C5C4fb9dFc1F439D4Ed1b54f4DE3FA4'; //  Will Change depends on the deployment
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

    useEffect(() => {
      fetch('verify', {
        method: 'POST',
      })
      .then((r) => r.json())
      .then((r) => {
        if(r.message !== 'success') {
          return;
        } else {
          setBuyButton(true);
          return;
        }
      })
      fetch("/marketRetrieve", {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message !== "No record") {
            setProducts(data);
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });

      
      // setProducts(data);
  
  
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
    

    getProvider();
    initWeb3();

  },[]);

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

const buyAsset = async (assetID, productPrice, oldOwnerAddress) => {

    //  Store Previous Owner Address
    let targetAddress = oldOwnerAddress;

    //  Create a Smart Contract Instance
    var myContract = new web3.eth.Contract(contractABI,contractAddress);

    //  Convert Ether into Wei
    const amountInWei = web3.utils.toWei(productPrice,'ether');

    //  Call purchaseAsset
    await myContract.methods.purchaseAsset(assetID).send({
      from: wallet.accounts[0],
      value: amountInWei  //  Price of Item When Called
    })
    .on('receipt', (receipt) => {
      console.log(receipt);

      let txID = receipt.blockHash; 
      let dateElapse = Date.now();
      let txDate = new Date(dateElapse);
      // let txNote = receipt.status;
      let userAddr = wallet.accounts[0];
      

      fetch('/uploadTransaction', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({txID, txDate, amount, userAddr, targetAddress, username}),
      })
      .then((r) => r.json())
      .then((r) => {
        if (r.message === 'success') {
          return;
        } else {
          console.error(r.message);
        }
      })
    })
}



  // Render page
  return (
    <div>
      <div className="container mb-5">
        <div className="content-header mb-3 mt-5">
          <h2 style={{ textAlign: "center" }}>Top Products</h2>
        </div>

        <div className="menu-btns mb-3">
          <button
            type="button"
            className={
              categoryFilter === "all" ? "menu-btn active-btn" : "menu-btn"
            }
            onClick={() => handleFilter("all")}
          >
            All
          </button>
          <button
            type="button"
            className={
              categoryFilter === "New" ? "menu-btn active-btn" : "menu-btn"
            }
            onClick={() => handleFilter("New")}
          >
            New products
          </button>
          <button
            type="button"
            className={
              categoryFilter === "Top"
                ? "menu-btn active-btn"
                : "menu-btn"
            }
            onClick={() => handleFilter("Top")}
          >
            Trending products
          </button>
        </div>
        {/* DISPLAY PRODUCTS */}
        <div className="row">
          {products.map((product, index) => {
            if (categoryFilter === 'all' || product.category === categoryFilter) {
              return (
                <div
                  key={index}
                  className={`col-sm-3 mt-3 ${product.category}`}
                >
                  <div className="card" style={{ width: "13rem" }}>
                    <img
                      className="card-img-top"
                      src={product.imgsrc}
                      alt={product.assetname}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{product.assetname}</h5>
                      <p className="card-text">
                        Seller: {product.owneraddress}
                      </p>
                      <p className="card-text">
                        Price: {product.assetprice} ETH
                      </p>

                      {buyButton ? (
                        <div>
                          <button
                            onClick={() =>
                              buyAsset(product.assetid+2, product.assetprice, product.owneraddress)
                            }
                            className="btn btn-primary"
                          >
                            Buy
                          </button>
                        </div>
                      ) : (
                        <div>
                          <button
                            onClick={() => navigate("/login")}
                            className="btn btn-primary"
                          >
                            Login to Buy Asset
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>

        {/* END of product list */}
      </div>
    </div>
  );
};
export default Market;
