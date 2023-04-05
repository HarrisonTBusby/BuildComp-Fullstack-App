import React, { useState } from 'react';
import './Navbar.css';
import { Container, Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useLocation } from 'react-router-dom';
const logo = require('../../Assets/Images/BlackLogo.png');

interface NavLink {
  name: string;
  path: string;
}

export default function NavbarComponent() {
  const location = useLocation();

  return (
    <Navbar expand="lg" className="NavBackground">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="nav-links">
            <Nav.Link as={Link} to='/' className={`fontColor  ${location.pathname === '/' ? 'active' : ''}`}>Home</Nav.Link>
            <Nav.Link as={Link} to='/BestBuilds' className={`fontColor  ${location.pathname === '/BestBuilds' ? 'active' : ''}`}>Best Builds</Nav.Link>
            <Nav.Link as={Link} to='/Wishlist' className={`fontColor  ${location.pathname === '/Wishlist' ? 'active' : ''}`}>Wishlist</Nav.Link>
            <Nav.Link as={Link} to='/PreviousSelections' className={`fontColor  ${location.pathname === '/PreviousSelections' ? 'active' : ''}`}>Previous Selections</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Brand as={Link} to="/" className="fontColor">
          <img className="logoSize" src={logo} />BuildComp
        </Navbar.Brand>
        <Nav.Link as={Link} to="/Login" className="fontColor mx-3">
          Login
        </Nav.Link>
      </Container>
    </Navbar>
  );
}
