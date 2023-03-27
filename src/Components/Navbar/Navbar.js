import React from 'react'
import './Navbar.css';
import {Container, Navbar, Nav} from 'react-bootstrap';
import {Link} from 'react-router-dom';

export default function NavbarComponent() {
  return (
    <Navbar bg="light" expand="lg">
    <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link as={Link} to='/'>Home</Nav.Link>
                <Nav.Link as={Link} to='/BestBuilds'>Best Builds</Nav.Link>
                <Nav.Link as={Link} to='/Wishlist'>Wishlist</Nav.Link>
                <Nav.Link as={Link} to='/PreviousSelections'>Previous Selections</Nav.Link>
            </Nav>
        </Navbar.Collapse>
        <Navbar.Brand as={Link} to='/'>BuildComp</Navbar.Brand>
    </Container>
</Navbar>
  )
}