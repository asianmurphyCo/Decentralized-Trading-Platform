// import
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./css/style.css";
import profile_pic from "../components/assets/profile.png";
import LoadingScreen from "./loading";

// PASS Username key and login state from Local Storage

// const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

const Profile = (props) => {
  const [userData, setUserData] = useState([]);
  const [firstRender, setFirsRender] = useState(true);
  const { isLoggedIn } = props;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // profile will request from database the entries of the user => POST => call api to verify (token, user)
        // token is from cookie 
        // if not verify (loading screen)
        // if verify (/profile)

        const response = await fetch("/data/fake_user.json");
        const data = await response.json();

        // ACCESS user key in your JSON file
        setUserData(data[localStorage.getItem("user")]); // Change to any user key in json file
        
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (firstRender) {
      fetchData();
      setFirsRender(false);
    }
  }, [firstRender, userData]);

  // Wait for userData before render
  if (!userData || !isLoggedIn) {
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
                <h5 className="my-3">{userData.username}</h5>
                <p className="text-muted mb-1">User#000</p>
                <p className="text-muted mb-4">Kivotos, BA</p>
                <h5 className="text-muted mb-4">
                  Balance: {userData.balance} ETH
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
                    <p className="text-muted mb-0">{userData.username}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Email</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{userData.email}</p>
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
                    <p className="text-muted mb-0">{userData.wallet}</p>
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
                        state: {
                          isLoggedIn: localStorage.getItem("isLoggedIn"),
                        },
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
