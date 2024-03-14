import "./css/style.css";
import React, { useState, useEffect } from "react";
import productsData from "../components/utils/product.json";
import rainbow from "../components/assets/rainbow-icon.png";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import { formatBalance } from "./utils/formatBalance";

const Market = () => {
  const [products, setProducts] = useState([]);

   //  Initial Wallet State
   const initialState = {
    accounts:[],
    balance:"",
    chainID:"",
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



  useEffect(() => {

      // Set products from imported JSON data
    console.log(productsData.products); // Log the imported data
    setProducts(productsData.products);
  
  
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

  }, []);

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

const buyAsset = async (assetID, productPrice) => {

    //  Create a Smart Contract Instance
    var myContract = new web3.eth.Contract(contractABI,contractAddress);



    //  Call purchaseAsset
    await myContract.methods.purchaseAsset(assetID,productPrice).send({
      from: wallet.accounts[0],
      value: productPrice  //  Price of Item When Called
    })
    .on('ItemPurchased', (receipt) => {
      console.log(receipt);
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
            className="menu-btn active-btn"
            data-category="all"
          >
            All
          </button>
          <button
            type="button"
            className="menu-btn"
            data-category="canned-food"
          >
            New products
          </button>
          <button type="button" className="menu-btn" data-category="vegetable">
            Top Favorite
          </button>
        </div>
        {/* DISPLAY PRODUCTS */}
          <div className="row">
            {products.map((product, index) => (
              <div key={index} className="col-sm-3 mt-3 canned-food">
                <div className="card" style={{ width: "13rem" }}>
                  <img
                    className="card-img-top"
                    src={product.source}
                    alt={product.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">Seller: {product.address}</p>
                    <p className="card-text">Price: {product.price} ETH</p>

                    <button onClick={buyAsset(product.id, product.price)} className="btn btn-primary">
                      Buy
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* END of product list */}
        </div>
      </div>
  );
};
export default Market;
