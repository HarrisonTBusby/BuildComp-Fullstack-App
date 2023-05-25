import React from 'react'
import { Row, Col, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer>
            <Row className='gutterless gap-5 footer-content'>
                <Col className='head-one'>
                    <p className='footer-heading'>Finding better PC parts for you!</p>
                    <Nav>
                        <div className='text-white'>
                            <Nav.Link as={Link} to='/Login'>Login</Nav.Link>
                            <Nav.Link as={Link} to='/'>Home</Nav.Link>
                            <Nav.Link as={Link} to='/Parts'>Parts</Nav.Link>
                            <Nav.Link as={Link} to='/Wishlist'>Wishlist</Nav.Link>
                            <Nav.Link as={Link} to='/PreviousSelections'>Previous Selections</Nav.Link>
                        </div>
                    </Nav>
                </Col>
                <Col className='text-center'>
                    <p className='footer-heading'>Support or Questions</p>
                    <p>harrisontbusby@gmail.com</p>
                </Col>
            </Row>
            <p className='mt-4 text-center'>Created by Harrison Busby & Carlos Felipe</p>
        </footer>
    )
}
