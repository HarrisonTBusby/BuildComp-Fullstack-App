import React, { useState, MouseEvent } from 'react';
import { Container, Row, Col, Dropdown, Button, OverlayTrigger, Tooltip, Card } from 'react-bootstrap';
import NavbarComponent from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getSessionStorage } from '../../Services/LocalStorage';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function Homepage() {
    const navigate = useNavigate();
    const renderTooltip = (text: string) => (
        <Tooltip id={`tooltip-${text}`}>
            {text}
        </Tooltip>
    );

    const [cpuValue, setCpuValue] = useState<string>('');
    const [title, setTitle] = useState<string>('PC Components')
    return (
        <>
            <NavbarComponent />
            <Row className='BannerImg'>
                <Col md={5} className='hero-padding'>
                    <h2 className='bannerFont'>Looking for the perfect PC build? You've come
                        to the right place!
                    </h2>
                </Col>
            </Row>
            <Container className='home-body'>
                <h3 style={{backgroundColor:'#4463D5', color:'white', padding:'20px', borderRadius:'4px'}}>Lets Get Started!</h3>
                <Row className="MainListCards">
                    <Col>
                    <a onClick={() => navigate('/Parts')}><div className="MainPageCards 1">
                            <div className="card_image"></div>
                            <div className="card_title">
                                <p>CPU</p>
                            </div>
                        </div></a>
                    </Col>

                    <Col>
                        <a onClick={() => navigate('/Wishlist')}><div className="MainPageCards 2">
                            <div className="card_image"></div>
                            <div className="card_title">
                                <p>GPU</p>
                            </div>
                        </div></a>
                    </Col>

                    <Col>
                        <a onClick={() => navigate('/PreviousSelections')}><div className="MainPageCards 3">
                            <div className="card_image"></div>
                            <div className="card_title">
                                <p>Motherboard</p>
                            </div>
                        </div></a>
                    </Col>

                    <Col>
                    <a onClick={() => navigate('/Parts')}><div className="MainPageCards 4">
                            <div className="card_image"></div>
                            <div className="card_title">
                                <p>Case</p>
                            </div>
                        </div></a>
                    </Col>
                </Row>

                <Row className="MainListCards">
                    <Col>
                    <a onClick={() => navigate('/Parts')}><div className="MainPageCards 1">
                            <div className="card_image"></div>
                            <div className="card_title">
                                <p>RAM</p>
                            </div>
                        </div></a>
                    </Col>

                    <Col>
                        <a onClick={() => navigate('/Wishlist')}><div className="MainPageCards 2">
                            <div className="card_image"></div>
                            <div className="card_title">
                                <p>Power Supply</p>
                            </div>
                        </div></a>
                    </Col>

                    <Col>
                        <a onClick={() => navigate('/PreviousSelections')}><div className="MainPageCards 3">
                            <div className="card_image"></div>
                            <div className="card_title">
                                <p>Heatsink</p>
                            </div>
                        </div></a>
                    </Col>

                    <Col>
                    <a onClick={() => navigate('/Parts')}><div className="MainPageCards 4">
                            <div className="card_image"></div>
                            <div className="card_title">
                                <p>Hard Drives</p>
                            </div>
                        </div></a>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    )
};
