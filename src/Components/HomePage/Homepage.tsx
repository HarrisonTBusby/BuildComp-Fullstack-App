import React, { useState, MouseEvent } from 'react';
import { Container, Row, Col, Dropdown, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import NavbarComponent from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, Navigate, useNavigate } from 'react-router-dom';

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
                <h3>What parts are you looking for?</h3>
                <Dropdown className='home-dropdown'>
                    <Dropdown.Toggle className=''>
                        {title}
                    </Dropdown.Toggle>
                    <Dropdown.Menu className='ddButton'>
                        <OverlayTrigger placement="right" overlay={renderTooltip('Provides the instructions and processing power the computer needs to do its work. The more powerful and updated your processor, the faster your computer can complete its tasks.')}>
                            <Dropdown.Item onClick={() => setTitle('CPU')} value='Cpu'>CPU</Dropdown.Item>
                        </OverlayTrigger>
                        <OverlayTrigger placement="right" overlay={renderTooltip('Helps handle graphics-related work like graphics, effects, and videos')}>
                            <Dropdown.Item onClick={() => setTitle('GPU')} value='Gpu'>GPU</Dropdown.Item>
                        </OverlayTrigger>
                        <OverlayTrigger placement="right" overlay={renderTooltip('The circuit board that connects all of your hardware to your processor, distributes electricity from your power supply, and defines the types of storage devices, memory modules, and graphics cards (among other expansion cards) that can connect to your PC.')}>
                            <Dropdown.Item onClick={() => setTitle('Motherboard')} value='Motherboard'>Motherboard</Dropdown.Item>
                        </OverlayTrigger>
                        <OverlayTrigger placement="right" overlay={renderTooltip('Container for all PC Components')}>
                            <Dropdown.Item onClick={() => setTitle('Case')} value='Case'>Case</Dropdown.Item>
                        </OverlayTrigger>
                        <OverlayTrigger placement="right" overlay={renderTooltip('RAMs purpose is to store the short term data that a PC requires to properly operate.')}>
                            <Dropdown.Item onClick={() => setTitle('RAM')} value='Ram'>RAM</Dropdown.Item>
                        </OverlayTrigger>
                        <OverlayTrigger placement="right" overlay={renderTooltip('Pulls power from your wall outlet and distribute it throughout your PC.')}>
                            <Dropdown.Item onClick={() => setTitle('Power Supply')} value='Power Supply'>Power Supply</Dropdown.Item>
                        </OverlayTrigger>
                        <OverlayTrigger placement="right" overlay={renderTooltip('Properly removes heat from device components to improve device performance and extend its life. And usually, a heat sink incorporates a fan or other mechanism to reduce the temperature of a hardware component, such as a processor.')}>
                            <Dropdown.Item onClick={() => setTitle('Heat Sink')} value='Heat Sink'>Heat Sink</Dropdown.Item>
                        </OverlayTrigger>
                        <OverlayTrigger placement="right" overlay={renderTooltip('A hard drive is the hardware component that stores all of your digital content. Your documents, pictures, music, videos, programs, application preferences, and operating system represent digital content stored on a hard drive.')}>
                            <Dropdown.Item onClick={() => setTitle('Hard Drive')} value='Hard Drives'>Hard Drives</Dropdown.Item>
                        </OverlayTrigger>
                    </Dropdown.Menu>
                </Dropdown>
                <Button onClick={(title) => navigate('/Parts')} className='bg-white text-black'>Submit</Button>
            </Container>
            <Footer />
        </>
    )
};
