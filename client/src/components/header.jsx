// import
import "./css/style.css";

import { Outlet, Link, useNavigate } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

const Header = (props) => {
  const navigate = useNavigate();
  const { isLoggedIn } = props;

  const Logout = () => {
    // Clear localStorage and redirect to login page

    fetch("verify", {
      method: "POST",
      body: { isLoggedIn },
    })
      .then((r) => r.json())
      .then((r) => {
        if (r.message === "success") {
          fetch("/logout", {
            method: "POST",
            body: { isLoggedIn },
          })
            .then((r) => r.json())
            .then((r) => {
              if ("success" === r.message) {
                props.setIsLoggedIn(false);
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                navigate("/login");
              } else {
                window.alert("User has not logged in.");
              }
            });
        }
      });

    // fetch('/logout', {
    //   method: 'POST',
    //   body: {isLoggedIn},
    // })
    // .then((r) => r.json())
    // .then((r) => {
    //   if ('success' === r.message) {
    //     props.setIsLoggedIn(false);
    //     localStorage.removeItem("token");
    //     localStorage.removeItem("user");
    //     navigate("/login");
    //   } else {
    //     window.alert('User has not logged in.')
    //   }
    // })
  };

  // const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const username = localStorage.getItem("user");

  return (
    <header>
      {/* NAVBAR */}
      <Navbar expand="lg" className="header my-3">
        <Container>
          <Navbar.Brand className="text-white me-5">
            <strong>AsianMurphy</strong>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "200px" }}
              navbarScroll
            >
              <Nav.Link className=" text-white headerItem2 mx-3">
                <Link className="headerItem" to="/home">
                  Home
                </Link>
              </Nav.Link>

              <Nav.Link className=" text-white headerItem2 mx-3">
                <Link className="headerItem" to="/dashboard">
                  Dashboard
                </Link>
              </Nav.Link>

              <NavDropdown
                title="More"
                id="navbarScrollingDropdown"
                className="headerItem mx-3"
              >
                <NavDropdown.Item href="" className="text-light headerItem">
                  <Link className="headerItem" to="/Trade">
                    Trade
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item href="" className="text-light headerItem">
                  <Link className="headerItem" to="/market">
                    Market
                  </Link>
                </NavDropdown.Item>

                <NavDropdown.Item href="" className="text-light headerItem">
                  <Link className="headerItem" to="/sell_asset">
                    Sell Your Asset
                  </Link>
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="mx-2 my-2 search-bg"
                aria-label="Search"
              />
            </Form>
            {/* IF USER HAS LOGGED IN, CONNECT WALLET WILL DISPLAY USER'S NAME AND PROVIDE A LOG OUT BUTTON RIGHT BELOW */}
            {/* IF USER HASNT LOGGED IN, IT WILL DISPLAY "CONNECT WALLET" AND DIRECT USER TO LOGIN PAGE */}
            {isLoggedIn ? (
              <NavDropdown
                title={username}
                id="navbarScrollingDropdown"
                className="btn btn-primary btn-color mx-2 my-2"
              >
                <NavDropdown.Item className="headerItem">
                  <Link className="headerItem" to="/profile">
                    Profile
                  </Link>
                </NavDropdown.Item>

                <NavDropdown.Divider />
                <NavDropdown.Item className="headerItem" onClick={Logout}>
                  Log out
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <button
                type="button"
                className="btn btn-primary btn-color mx-2 my-2"
              >
                <Link to="/login">Connect Wallet</Link>
              </button>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Outlet />
    </header>
  );
};

export default Header;
