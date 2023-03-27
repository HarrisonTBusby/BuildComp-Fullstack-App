import React from 'react'
import { Container, Row, Col} from 'react-bootstrap'
import NavbarComponent from '../Navbar/Navbar.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Homepage.css';
import { Link } from 'react-router-dom';

export default function Homepage() {
    return (
        <body>
           <NavbarComponent/>
            <Row>
                <Col className='col-12'>
                    
                </Col>
            </Row>

        </body>
    )
}
