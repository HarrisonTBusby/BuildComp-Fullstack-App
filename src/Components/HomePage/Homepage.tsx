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
                <h3>Lets Get Started!</h3>
                <Row className="MainListCards">
                    <Col>
                    <a onClick={() => navigate('/Parts')}><div className="MainPageCards 1">
                            <div className="card_image"><img className='imgMainCard'/></div>
                            <div className="card_title">
                                <p>Parts</p>
                            </div>
                        </div></a>
                    </Col>

                    <Col>
                        <a onClick={() => navigate('/Wishlist')}><div className="MainPageCards 2">
                            <div className="card_image"><img className='imgMainCard'/></div>
                            <div className="card_title">
                                <p>Wishlist</p>
                            </div>
                        </div></a>
                    </Col>

                    <Col>
                        <a onClick={() => navigate('/PreviousSelections')}><div className="MainPageCards 3">
                            <div className="card_image"><img className='imgMainCard'/></div>
                            <div className="card_title">
                                <p>Previous Selections</p>
                            </div>
                        </div></a>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    )
};
