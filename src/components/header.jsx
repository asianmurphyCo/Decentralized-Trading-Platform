// import
import './css/header.css'

import { Outlet, Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Header() {
    return (
        <div className='body'>
        {/* NAVBAR */}
            <Navbar expand="lg" className="header my-3">
                <Container>
                    <Navbar.Brand className='text-white me-5'><strong>AsianMurphy</strong></Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '200px' }}
                        navbarScroll
                    >   
                        <Nav.Link className=' text-white headerItem2 mx-3'><Link className='headerItem' to="/home">Home</Link></Nav.Link>

                        <Nav.Link href="#action1" className=' text-white headerItem mx-3'>About Us</Nav.Link>

                        <Nav.Link className=' text-white headerItem2 mx-3'><Link className='headerItem' to="/dashboard">Dashboard</Link></Nav.Link>

                        <NavDropdown title="More" id="navbarScrollingDropdown" className='headerItem mx-3'>
                        <NavDropdown.Item href="#action3" className='text-light headerItem'>Trade</NavDropdown.Item>
                        <NavDropdown.Item href="#action4" className='text-light headerItem'>
                            Swap
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action5" className='text-light headerItem'>
                            Something else here
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
                    <a href="#"><button type="button" className='btn btn-primary btn-color mx-2 my-2'><Link to="/login">Connect Wallet</Link></button></a>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            
            <Outlet/>
        </div>
    )
}

export default Header