import React, { useState } from 'react';
import './Navbar.css';
import { Container, Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
const logo = require('../../Assets/Images/Logo.png');

interface NavLink {
  name: string;
  path: string;
}

export default function NavbarComponent() {
  const [activeLink, setActiveLink] = useState<string>('/'); // set default active link to '/'

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  };

  const generateNavLinks = (links: NavLink[]) =>
    links.map((link) => (
      <Nav.Link
        key={link.path}
        as={Link}
        to={link.path}
        onClick={() => handleLinkClick(link.path)}
        className={`fontColor mx-5 ${activeLink === link.path ? 'active' : ''}`}
      >
        {link.name}
      </Nav.Link>
    ));

  const links: NavLink[] = [
    { name: 'Home', path: '/' },
    { name: 'Best Builds', path: '/BestBuilds' },
    { name: 'Wishlist', path: '/Wishlist' },
    { name: 'Previous Selections', path: '/PreviousSelections' },
  ];

  return (
    <Navbar expand="lg" className="NavBackground">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-5">{generateNavLinks(links)}</Nav>
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
