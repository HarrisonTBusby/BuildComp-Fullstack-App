import React from 'react'
import './BestBuilds.css'
import NavbarComponent from '../Navbar/Navbar';
import { Container, Row, Col, Dropdown, Form, Input } from 'react-bootstrap';
import Footer from '../Footer/Footer';
import { Link } from 'react-router-dom';

export default function BestBuilds() {
    return (
        <body>
            <NavbarComponent />
            
                <Row>
                    <Col className='span filterBackground'>

                    </Col>  
                    <Col className='marginLeft'></Col>
                </Row>
           
            <Footer />
        </body>
    )
}
