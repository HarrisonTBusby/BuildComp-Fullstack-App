import React from 'react'
import './Footer.css';
import { Row, Col, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer>
            <Row>
                <Col className='mt-3'>
                    <p className='supportFont'>Finding better PC parts for you!</p>
                </Col>
                <Col className='mt-3'>
                    <p className='questionFont'>Support or Questions</p>
                    <p className='emailFont'>harrisontbusby@gmail.com</p>
                </Col>
            </Row>
            <Col>
            <Nav className='marginLeft font4'>
                <Row>
                <Nav.Link as={Link} to='/Login'>Login</Nav.Link>
                <Nav.Link as={Link} to='/'>Home</Nav.Link>
                <Nav.Link as={Link} to='/BestBuilds'>Best Builds</Nav.Link>
                <Nav.Link as={Link} to='/Wishlist'>Wishlist</Nav.Link>
                <Nav.Link as={Link} to='/PreviousSelections'>Previous Selections</Nav.Link>
                </Row>
            </Nav>
            </Col>

            <Col></Col>
            <Row>

            </Row>

            <Row className='center'>
                <p className='center mt-4 font4'>Created by Harrison Busby, Carlos Felipe, and Reed Goodwin</p>
            </Row>
        </footer>
    )
}
