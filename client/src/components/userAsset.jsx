import "./css/style.css";
import React, { useState, useEffect } from "react";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import { formatBalance } from "./utils/formatBalance";
import {useNavigate} from "react-router-dom";

const UserAsset = () => {
  const [products, setProducts] = useState([]);
  const [buyButton, setBuyButton] = useState(false);
  const navigate = useNavigate()
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

    //  Web3 Instance
    const [web3,setWeb3] = useState({});

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
            <div key={index} className="col-sm-3 mt-3 canned">
              <div className="card" style={{ width: "13rem" }}>
                <img
                  className="card-img-top"

                  src={product.imgsrc}

                  alt={product.assetname}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.assetname}</h5>
                  <p className="card-text">Seller: {product.owneraddress}</p>
                  <p className="card-text">Price: {product.assetprice} ETH</p>

                  {buyButton ? (
                    <div>
                      <button
                        onClick={() => buyAsset(product.assetid, product.assetprice)}
                        className="btn btn-primary"
                      >
                        Buy
                      </button>
                    </div>
                  ):(
                    <div>
                      <button
                        onClick={() => navigate('/login')}
                        className="btn btn-primary"
                      >
                        Login to Buy Asset
                      </button>
                    </div>
                  )}
                  
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
export default UserAsset;

