// import
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./css/style.css";
import profile_pic from "../components/assets/profile.png";
import cat from "../components/assets/mya-thurston-waffles.gif";
import {CircularProgress,Box} from '@mui/material';

// PASS Username key from Local Storage
const Username = localStorage.getItem("username");
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

  if (!userData) {
    // If userData is still null, return a loading page
    return <div>
       <Box sx={{ display: 'flex' , alignContent:'center'}}>
                    <CircularProgress />
                </Box>
    </div>;
  }

  // Check if user is logged in
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  if (!isLoggedIn) {
    // Render an error message or a login prompt
    return (
      <div className="error-message vh-100">
        <div className="mask d-flex align-items-center h-100 gradient-custom-3">
          <div className="container h-100">
            <div className="col-sm-12 col-md-12 col-lg-12 mb-5 mt-5">
              <div className="card login-bg">
                <p className="text-uppercase text-center mb-4">
                  You are not logged in. Please log in to view this page.
                </p>
                {/* DIRECT USER BACK TO LOGIN PAGE */}
                <img className="w-30 mx-auto d-block" src={cat} alt="getout" />
                <button>
                  <Link to="/login" className="text-light">
                    Go back to log in&nbsp;
                  </Link>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    width="25"
                    height="25"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If logged in, render the profile
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
                <hr/>
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
export default Profile;
