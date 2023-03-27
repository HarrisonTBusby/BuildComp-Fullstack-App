import React from 'react'
import './Navbar.css';
import {Container, Navbar, Nav} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from 'react-router-dom';
import Logo from '../../Assets/BGLogoRB.png';
export default function NavbarComponent() {
  return (
    <Navbar expand="lg" className='NavBackground'>
    <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-5">
                <Nav.Link as={Link} to='/' className='fontColor mx-5'>Home</Nav.Link>
                <Nav.Link as={Link} to='/BestBuilds' className='fontColor mx-5'>Best Builds</Nav.Link>
                <Nav.Link as={Link} to='/Wishlist' className='fontColor mx-5'>Wishlist</Nav.Link>
                <Nav.Link as={Link} to='/PreviousSelections' className='fontColor mx-5'>Previous Selections</Nav.Link>
            </Nav>
        </Navbar.Collapse>
        <Navbar.Brand as={Link} to='/' className='fontColor'><img className='logoSize' src={Logo}/>BuildComp</Navbar.Brand>
    </Container>
</Navbar>
  )
}
