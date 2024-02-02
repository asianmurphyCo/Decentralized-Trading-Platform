// import
import React, { useState, useEffect } from "react";
import "./css/style.css";
import profile_pic from "../components/assets/profile.png";

function Profile() {
    const [userData, setUserData] = useState(null);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('/data/fake_user.json');
          const data = await response.json();

          // Assuming you have a user key in your JSON file
          setUserData(data.admin); // Change 'admin' to the actual user key
        } catch (error) {
            console.error("Error fetching user data:", error);
            setUserData({});
        }
      };

      fetchData();
    }, []);

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
                <h5 className="my-3">{userData.username}</h5>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Profile;
