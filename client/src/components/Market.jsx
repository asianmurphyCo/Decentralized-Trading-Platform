import "./css/style.css";
import React, { useState, useEffect } from "react";
import productsData from "../components/utils/product.json";
import rainbow from "../components/assets/rainbow-icon.png";

const Market = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Set products from imported JSON data
    console.log(productsData.products); // Log the imported data
    setProducts(productsData.products);
  }, []);

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
          <div className="col-sm-3 mt-3 canned-food">
            <div className="card" style={{ width: "13rem" }}>
              <img
                className="card-img-top"
                src={products.source}
                alt="product_img"
              />
              <div className="card-body">
                <h5 className="card-title">{products.name}</h5>
                <p className="card-text">{products.price} ETH</p>
                <a href="#" className="btn btn-primary">
                  Add to Cart
                </a>
              </div>
            </div>
          </div>

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

                    <a href="#" className="btn btn-primary">
                      Buy
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* END of product list */}
        </div>
      </div>
    </div>
  );
};
export default Market;
