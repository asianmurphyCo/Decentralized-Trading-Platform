// import
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./css/style.css";
import profile_pic from "../components/assets/profile.png";
import cat from "../components/assets/mya-thurston-waffles.gif";
import hertaload from "../components/assets/herta.webp";
import { CircularProgress, Box } from "@mui/material";

// PASS Username key and login state from Local Storage
const Username = localStorage.getItem("username");
const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
// DEBUG LINE
console.log(Username);

function Profile() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data/fake_user.json");
        const data = await response.json();

        // ACCESS user key in your JSON file
        setUserData(data[Username]); // Change to any user key in json file
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  // Check if user is logged in
  if (!userData && isLoggedIn) {
    // If userData is still null, return a loading page
    return (
      <div>
        <div className="mask d-flex align-items-center h-100 gradient-custom-3">
          <div className="container h-100">
            <div className="col-sm-12 col-md-12 col-lg-12 mb-5 mt-5">
              <div className="card login-bg">
                {/* DIRECT USER BACK TO LOGIN PAGE */}
                <img
                  className="w-30 mx-auto d-block"
                  src={hertaload}
                  alt="getout"
                  style={{ width: "20%" }}
                />
                <h1 className="text-center mb-4">Loading...</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If logged in, render the profile
  if (userData && isLoggedIn) {
    return (
      <section className="profile">
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
                  <h5 className="my-3"></h5>
                  <p className="text-muted mb-1">User#000</p>
                  <p className="text-muted mb-4">Kivotos, BA</p>
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
                      <Link to="/transaction">Show History</Link>
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
}
export default Profile;
