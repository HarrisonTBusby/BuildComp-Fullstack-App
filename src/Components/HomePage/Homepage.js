import React from 'react'
import { Container, Row, Col, Dropdown, Button } from 'react-bootstrap'
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
                    <h1 className='bannerFont'>Looking for the perfect PC build? You’ve come
                        to the right place!</h1>
                    <Row>
                        <Col>
                            <h1 className='bannerFont2'>Lets Get Started!</h1>
                        </Col>
                    </Row>
                </Col>
            </Row>

            <Container className='quizBg'>
                <Row className='center'>
                    <h1 className='quizFont1 marginTop'>What parts are you looking for?</h1>
                </Row>
                <Row className='center marginTop'>
                    <Dropdown className='center'>
                        <Dropdown.Toggle className='dropdownSize'>
                           PC Components
                        </Dropdown.Toggle>

                        <Dropdown.Menu className='ddButton'>
                            <Dropdown.Item value='Gpu'>CPU</Dropdown.Item>
                            <Dropdown.Item value='Cpu'>GPU</Dropdown.Item>
                            <Dropdown.Item value='Motherboard'>Motherboard</Dropdown.Item>
                            <Dropdown.Item value='Case'>Case</Dropdown.Item>
                            <Dropdown.Item value='Fan'>Fans</Dropdown.Item>
                            <Dropdown.Item value='Ram'>RAM</Dropdown.Item>
                            <Dropdown.Item value='Power Supply'>Power Supply</Dropdown.Item>
                            <Dropdown.Item value='Heat Sink'>Heat Sink</Dropdown.Item>
                            <Dropdown.Item value='Hard Drives'>Hard Drives</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Row>
                <Row className='center marginTop'>
                    <Button className='submitBtn'>Submit</Button>
                </Row>
            </Container>

        </body>
    )
}
