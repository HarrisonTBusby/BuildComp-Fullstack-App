import React, { useState } from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { removeFromSessionStorage } from '../../Services/LocalStorage';
const logo = require('../../Assets/Images/BlackLogo.png');

interface NavLink {
  name: string;
  path: string;
}

export default function NavbarComponent() {
  const navigate = useNavigate();
  const location = useLocation();
 

  const handleSignOut = () => {
    localStorage.setItem('BuildCompToken', 'guest');
    removeFromSessionStorage('Username');
    navigate('/')
  }
  

  const LoggerComponent = () => {
    let token = localStorage.getItem("BuildCompToken");
    if(token != "guest"){
      return (
        <Nav.Link onClick={() => handleSignOut()} className="fontColor mx-3">
          Sign out
        </Nav.Link>
        
      )
    }else {
      return (
        <Nav.Link as={Link} to="/Login" className="fontColor mx-3">
          Login
        </Nav.Link>
      )
    }
  }

  return (
    <Navbar expand="lg" className="NavBackground">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="nav-links">
            <Nav.Link as={Link} to='/' className={`fontColor  ${location.pathname === '/' ? 'active' : ''}`}>Home</Nav.Link>
            <Nav.Link as={Link} to='/Parts' className={`fontColor  ${location.pathname === '/Parts' ? 'active' : ''}`}>Parts</Nav.Link>
            <Nav.Link as={Link} to='/Wishlist' className={`fontColor  ${location.pathname === '/Wishlist' ? 'active' : ''}`}>Wishlist</Nav.Link>
            <Nav.Link as={Link} to='/PreviousSelections' className={`fontColor  ${location.pathname === '/PreviousSelections' ? 'active' : ''}`}>Previous Selections</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Brand as={Link} to="/" className="fontColor">
          <img className="logoSize" src={logo} />BuildComp
        </Navbar.Brand>
        <LoggerComponent/>
      </Container>
    </Navbar>
  );
}
