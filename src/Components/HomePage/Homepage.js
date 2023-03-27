import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import NavbarComponent from '../Navbar/Navbar.js';
import Banner from '../../Assets/GamingImage.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Homepage.css';
import { Link } from 'react-router-dom';

export default function Homepage() {
    return (
        <body>
            <NavbarComponent />
            <Row className='BannerImg'>
                <Col>

                </Col>

                <Col>
                    <h1 className=''>Looking for the perfect PC build? You’ve come
                        to the right place!</h1>
                </Col>
            </Row>

        </body>
    )
}
