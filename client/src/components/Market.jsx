import "./css/style.css";
import rainbow from "../components/assets/rainbow-icon.png";
const Market = () => {
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
              Canned foods
            </button>
            <button
              type="button"
              className="menu-btn"
              data-category="vegetable"
            >
              Vegetables
            </button>
          </div>

          <div className="row">
            <div className="col-sm-3 mt-3 canned-food">
              <div className="card" style={{ width: "13rem" }}>
                <img
                  className="card-img-top"
                  src={rainbow}
                  alt="Card image cap"
                />
                <div className="card-body">
                  <h5 className="card-title">Beijing Corn</h5>
                  <p className="card-text">%n ETH</p>
                  <a href="#" className="btn btn-primary">
                    Add to Cart
                  </a>
                </div>
              </div>
            </div>

            <div className="col-sm-3 mt-3 canned-food">
              <div className="card" style={{ width: "13rem" }}>
                <img
                  className="card-img-top"
                  src={rainbow}
                  alt="Card image cap"
                />
                <div className="card-body">
                  <h5 className="card-title">Fruit Cocktail</h5>
                  <p className="card-text">%n ETH</p>
                  <a href="#" className="btn btn-primary">
                    Add to Cart
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}
export default Market;