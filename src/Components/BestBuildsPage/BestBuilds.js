import React from 'react'
import './BestBuilds.css'
import NavbarComponent from '../Navbar/Navbar.js';
import { Container, Row, Col, Dropdown, Form, InputGroup, OverlayTrigger, Tooltip } from 'react-bootstrap';
import Footer from '../Footer/Footer.js';
import { Link } from 'react-router-dom';

export default function BestBuilds() {

    const renderTooltip = (text) => (
        <Tooltip id={`tooltip-${text}`}>
            {text}
        </Tooltip>
    );
    return (
        <body>
            <NavbarComponent />

            <Row>
                <Col className='filterBackground mt-5'>
                    <div className='marginLeft2 filterBoxColor'>
                        <p className='mt-4'>Filter</p>
                        <button className='clearFiltersBtn'>Clear Filters</button>
                        <hr />
                        {/* Budget */}
                        {/* ====================================================================== */}
                        <p>Budget</p>
                        <input type='number' placeholder='Min'></input>
                        <input type='number' placeholder='Max'></input>
                        {/* Components */}
                        {/* ====================================================================== */}
                        <p className='mt-5'>Components</p>
                        <Dropdown>
                            <Dropdown.Toggle className='dropdownSize'>
                                PC Components
                            </Dropdown.Toggle>

                            <Dropdown.Menu className='ddButton'>
                                <OverlayTrigger placement="right" overlay={renderTooltip('Provides the instructions and processing power the computer needs to do its work. The more powerful and updated your processor, the faster your computer can complete its tasks.')}>
                                    <Dropdown.Item value='Cpu'>CPU</Dropdown.Item>
                                </OverlayTrigger>
                                <OverlayTrigger placement="right" overlay={renderTooltip('Helps handle graphics-related work like graphics, effects, and videos')}>
                                    <Dropdown.Item value='Gpu'>GPU</Dropdown.Item>
                                </OverlayTrigger>
                                <OverlayTrigger placement="right" overlay={renderTooltip('The circuit board that connects all of your hardware to your processor, distributes electricity from your power supply, and defines the types of storage devices, memory modules, and graphics cards (among other expansion cards) that can connect to your PC.')}>
                                    <Dropdown.Item value='Motherboard'>Motherboard</Dropdown.Item>
                                </OverlayTrigger>
                                <OverlayTrigger placement="right" overlay={renderTooltip('Container for all PC Components')}>
                                    <Dropdown.Item value='Case'>Case</Dropdown.Item>
                                </OverlayTrigger>
                                <OverlayTrigger placement="right" overlay={renderTooltip('Used to draw cooler air into the case from the outside, expel warm air from inside and move air across a heat sink to cool a particular component.')}>
                                    <Dropdown.Item value='Fan'>Fans</Dropdown.Item>
                                </OverlayTrigger>
                                <OverlayTrigger placement="right" overlay={renderTooltip('RAMs purpose is to store the short term data that a PC requires to properly operate.')}>
                                    <Dropdown.Item value='Ram'>RAM</Dropdown.Item>
                                </OverlayTrigger>
                                <OverlayTrigger placement="right" overlay={renderTooltip('Pulls power from your wall outlet and distribute it throughout your PC.')}>
                                    <Dropdown.Item value='Power Supply'>Power Supply</Dropdown.Item>
                                </OverlayTrigger>
                                <OverlayTrigger placement="right" overlay={renderTooltip('Properly removes heat from device components to improve device performance and extend its life. And usually, a heat sink incorporates a fan or other mechanism to reduce the temperature of a hardware component, such as a processor.')}>
                                    <Dropdown.Item value='Heat Sink'>Heat Sink</Dropdown.Item>
                                </OverlayTrigger>
                                <OverlayTrigger placement="right" overlay={renderTooltip('A hard drive is the hardware component that stores all of your digital content. Your documents, pictures, music, videos, programs, application preferences, and operating system represent digital content stored on a hard drive.')}>
                                    <Dropdown.Item value='Hard Drives'>Hard Drives</Dropdown.Item>
                                </OverlayTrigger>
                            </Dropdown.Menu>
                        </Dropdown>

                        {/* Better Price or Better Performance */}
                        {/* ================================================== */}
                        <p className='mt-5'>Better Price or Better Performance</p>
                        <InputGroup className="mb-3">
                            <InputGroup.Checkbox />Better price
                            </InputGroup>
                            <InputGroup className="mb-3">
                            <InputGroup.Checkbox />Better performance
                            </InputGroup>
                        {/*Rgb or No Rgb  */}
                        {/* ========================================================== */}
                        <p className='mt-5'>RGB</p>
                        <InputGroup className="mb-3">
                            <InputGroup.Checkbox />RGB
                            </InputGroup>
                            <InputGroup className="mb-3">
                            <InputGroup.Checkbox />No RGB
                            </InputGroup>
                    </div>
                </Col>
                <Col className='marginLeft mt-5 mb-5'>
                    <input type={'search'} placeholder='Search' className='searchWidth'></input>
                </Col>
            </Row>


            <Footer />
        </body>
    )
}
