import React from 'react'
import './Navbar.css';
import {Container, Navbar, Nav} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import Logo from '../../Assets/BGLogoRB.png';
export default function NavbarComponent() {
  return (
    <Navbar expand="lg" className='NavBackground'>
    <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link as={Link} to='/' className='fontColor'>Home</Nav.Link>
                <Nav.Link as={Link} to='/BestBuilds' className='fontColor'>Best Builds</Nav.Link>
                <Nav.Link as={Link} to='/Wishlist' className='fontColor'>Wishlist</Nav.Link>
                <Nav.Link as={Link} to='/PreviousSelections' className='fontColor'>Previous Selections</Nav.Link>
            </Nav>
        </Navbar.Collapse>
        <Navbar.Brand as={Link} to='/' className='fontColor'><img className='logoSize' src={Logo}/>BuildComp</Navbar.Brand>
    </Container>
</Navbar>
  )
}
