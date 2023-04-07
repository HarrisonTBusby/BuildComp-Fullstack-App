import React, { useState, useEffect } from 'react';
import './BestBuilds.css';
import NavbarComponent from '../Navbar/Navbar';
import { Container, Row, Col, Dropdown, InputGroup, OverlayTrigger, Tooltip, Card, Button } from 'react-bootstrap';
import Footer from '../Footer/Footer';
import { PaginationExample } from '../Pagination';
import 'bootstrap/dist/css/bootstrap.min.css';
import {saveToLocalStorageByName} from '../../Services/LocalStorage';

export default function BestBuilds() {

    type Component = 'Cpu' | 'Gpu' | 'Motherboard' | 'Case' | 'Fan' | 'RAM' | 'Power Supply' | 'Heat Sink' | 'Hard Drives';
    const [selectedComponent, setSelectedComponent] = useState<Component>('Cpu');
    const [minBudget, setMinBudget] = useState<string>('');
    const [maxBudget, setMaxBudget] = useState<string>('');



    // For Dropdown values
    const handleComponentSelection = (component: Component) => {
        setSelectedComponent(component);
        console.log(selectedComponent);
    };

    // For ToolTip on Dropdown
    const renderTooltip = (content: string) => {
        return <Tooltip id='button-tooltip'>{content}</Tooltip>;
    };




    // For Budget values
    const handleMinBudget = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key == 'Enter') {
            setMinBudget(event.currentTarget.value);
            console.log(minBudget)
        }
    }

    const handleMaxBudget = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key == 'Enter') {

            setMaxBudget(event.currentTarget.value);
            console.log(maxBudget)
        }
    }

    const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    function useWindowSize() {
        // Initialize state with undefined width/height so server and client renders match
        // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
        const [windowSize, setWindowSize] = useState({
            width: 500,
            height: 500,
        });
        useEffect(() => {
            // Handler to call on window resize
            function handleResize() {
                // Set window width/height to state
                setWindowSize({
                    width: window.innerWidth,
                    height: window.innerHeight,
                });
            }
            // Add event listener
            window.addEventListener("resize", handleResize);
            // Call handler right away so state gets updated with initial window size
            handleResize();
            // Remove event listener on cleanup
            return () => window.removeEventListener("resize", handleResize);
        }, []); // Empty array ensures that effect is only run on mount
        return windowSize.width;
    }

    const size = useWindowSize();

















    return (
        <body>
            <NavbarComponent />
            <Row className='gutterless mt-5 bb-content'>
                {size < 768 ? (
                    <Dropdown className='my-4 mx-5'>
                        <Dropdown.Toggle >
                            Filters
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Col className='filterBackground p-3' md={3}>
                                <div className='marginLeft2 filterBoxColor'>
                                    <p className='mt-4'>Filter</p>
                                    <button className='clearFiltersBtn'>Clear Filters</button>
                                    <hr />
                                    {/* Budget */}
                                    {/* ====================================================================== */}
                                    <p>Budget</p>
                                    <input className='w-75' type='number' placeholder='Min' value={minBudget} onKeyDown={handleMinBudget} onChange={(event) => setMinBudget(event.currentTarget.value)}></input>
                                    <input className='w-75' type='number' placeholder='Max' value={maxBudget} onKeyDown={handleMaxBudget} onChange={(event) => setMaxBudget(event.currentTarget.value)}></input>
                                    {/* PC Components */}
                                    {/* ====================================================================== */}
                                    <p className='mt-5'>Components</p>
                                    <Dropdown className='bb-dropdown'>
                                        <Dropdown.Toggle className='dropdownSize'>
                                            PC Components
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu className='ddButton'>
                                            <OverlayTrigger placement="right" overlay={renderTooltip('Provides the instructions and processing power the computer needs to do its work. The more powerful and updated your processor, the faster your computer can complete its tasks.')}>
                                                <Dropdown.Item onClick={() => handleComponentSelection('Cpu')}>CPU</Dropdown.Item>
                                            </OverlayTrigger>
                                            <OverlayTrigger placement="right" overlay={renderTooltip('Helps handle graphics-related work like graphics, effects, and videos')}>
                                                <Dropdown.Item onClick={() => handleComponentSelection('Gpu')}>GPU</Dropdown.Item>
                                            </OverlayTrigger>
                                            <OverlayTrigger placement="right" overlay={renderTooltip('The circuit board that connects all of your hardware to your processor, distributes electricity from your power supply, and defines the types of storage devices, memory modules, and graphics cards (among other expansion cards) that can connect to your PC.')}>
                                                <Dropdown.Item onClick={() => handleComponentSelection('Motherboard')}>Motherboard</Dropdown.Item>
                                            </OverlayTrigger>
                                            <OverlayTrigger placement="right" overlay={renderTooltip('Container for all PC Components')}>
                                                <Dropdown.Item onClick={() => handleComponentSelection('Case')}>Case</Dropdown.Item>
                                            </OverlayTrigger>
                                            <OverlayTrigger placement="right" overlay={renderTooltip('Used to draw cooler air into the case from the outside, expel warm air from inside and move air across a heat sink to cool a particular component.')}>
                                                <Dropdown.Item onClick={() => handleComponentSelection('Fan')}>Fans</Dropdown.Item>
                                            </OverlayTrigger>
                                            <OverlayTrigger placement="right" overlay={renderTooltip('RAMs purpose is to store the short term data that a PC requires to properly operate.')}>
                                                <Dropdown.Item onClick={() => handleComponentSelection('RAM')}>RAM</Dropdown.Item>
                                            </OverlayTrigger>
                                            <OverlayTrigger placement="right" overlay={renderTooltip('Pulls power from your wall outlet and distribute it throughout your PC.')}>
                                                <Dropdown.Item onClick={() => handleComponentSelection('Power Supply')}>Power Supply</Dropdown.Item>
                                            </OverlayTrigger>
                                            <OverlayTrigger placement="right" overlay={renderTooltip('Properly removes heat from device components to improve device performance and extend its life. And usually, a heat sink incorporates a fan or other mechanism to reduce the temperature of a hardware component, such as a processor.')}>
                                                <Dropdown.Item onClick={() => handleComponentSelection('Heat Sink')}>Heat Sink</Dropdown.Item>
                                            </OverlayTrigger>
                                            <OverlayTrigger placement="right" overlay={renderTooltip('A hard drive is the hardware component that stores all of your digital content. Your documents, pictures, music, videos, programs, application preferences, and operating system represent digital content stored on a hard drive.')}>
                                                <Dropdown.Item onClick={() => handleComponentSelection('Hard Drives')}>Hard Drives</Dropdown.Item>
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
                            <Button>Apply filters</Button>
                        </Dropdown.Menu>
                        
                    </Dropdown>
                    
                ) : (
                    ''
                )}
                <Col className='filterBackground large-filter p-3' md={3}>
                    <div className='marginLeft2 filterBoxColor'>
                        <p className='mt-4'>Filter</p>
                        <button className='clearFiltersBtn'>Clear Filters</button>
                        <hr />
                        {/* Budget */}
                        {/* ====================================================================== */}
                        <p>Budget</p>
                        <input className='w-75' type='number' placeholder='Min' value={minBudget} onKeyDown={handleMinBudget} onChange={(event) => setMinBudget(event.currentTarget.value)}></input>
                        <input className='w-75' type='number' placeholder='Max' value={maxBudget} onKeyDown={handleMaxBudget} onChange={(event) => setMaxBudget(event.currentTarget.value)}></input>
                        {/* PC Components */}
                        {/* ====================================================================== */}
                        <p className='mt-5'>Components</p>
                        <Dropdown className='bb-dropdown'>
                            <Dropdown.Toggle className='dropdownSize'>
                                PC Components
                            </Dropdown.Toggle>

                            <Dropdown.Menu className='ddButton'>
                                <OverlayTrigger placement="right" overlay={renderTooltip('Provides the instructions and processing power the computer needs to do its work. The more powerful and updated your processor, the faster your computer can complete its tasks.')}>
                                    <Dropdown.Item onClick={() => handleComponentSelection('Cpu')}>CPU</Dropdown.Item>
                                </OverlayTrigger>
                                <OverlayTrigger placement="right" overlay={renderTooltip('Helps handle graphics-related work like graphics, effects, and videos')}>
                                    <Dropdown.Item onClick={() => handleComponentSelection('Gpu')}>GPU</Dropdown.Item>
                                </OverlayTrigger>
                                <OverlayTrigger placement="right" overlay={renderTooltip('The circuit board that connects all of your hardware to your processor, distributes electricity from your power supply, and defines the types of storage devices, memory modules, and graphics cards (among other expansion cards) that can connect to your PC.')}>
                                    <Dropdown.Item onClick={() => handleComponentSelection('Motherboard')}>Motherboard</Dropdown.Item>
                                </OverlayTrigger>
                                <OverlayTrigger placement="right" overlay={renderTooltip('Container for all PC Components')}>
                                    <Dropdown.Item onClick={() => handleComponentSelection('Case')}>Case</Dropdown.Item>
                                </OverlayTrigger>
                                <OverlayTrigger placement="right" overlay={renderTooltip('Used to draw cooler air into the case from the outside, expel warm air from inside and move air across a heat sink to cool a particular component.')}>
                                    <Dropdown.Item onClick={() => handleComponentSelection('Fan')}>Fans</Dropdown.Item>
                                </OverlayTrigger>
                                <OverlayTrigger placement="right" overlay={renderTooltip('RAMs purpose is to store the short term data that a PC requires to properly operate.')}>
                                    <Dropdown.Item onClick={() => handleComponentSelection('RAM')}>RAM</Dropdown.Item>
                                </OverlayTrigger>
                                <OverlayTrigger placement="right" overlay={renderTooltip('Pulls power from your wall outlet and distribute it throughout your PC.')}>
                                    <Dropdown.Item onClick={() => handleComponentSelection('Power Supply')}>Power Supply</Dropdown.Item>
                                </OverlayTrigger>
                                <OverlayTrigger placement="right" overlay={renderTooltip('Properly removes heat from device components to improve device performance and extend its life. And usually, a heat sink incorporates a fan or other mechanism to reduce the temperature of a hardware component, such as a processor.')}>
                                    <Dropdown.Item onClick={() => handleComponentSelection('Heat Sink')}>Heat Sink</Dropdown.Item>
                                </OverlayTrigger>
                                <OverlayTrigger placement="right" overlay={renderTooltip('A hard drive is the hardware component that stores all of your digital content. Your documents, pictures, music, videos, programs, application preferences, and operating system represent digital content stored on a hard drive.')}>
                                    <Dropdown.Item onClick={() => handleComponentSelection('Hard Drives')}>Hard Drives</Dropdown.Item>
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
                <Col md={9} className='cards px-2'>

                    <Card style={{ width: '16rem' }}>
                        <Card.Img variant="top" src="https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T2/images/I/51c1zFDNVmL._AC_SX679_.jpg" />
                        <Card.Body>
                            <Card.Title>Card Title</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card title and make up the
                                bulk of the card's content.
                            </Card.Text>
                            <Button variant="primary">Go somewhere</Button>
                        </Card.Body>
                    </Card>
                    <Card style={{ width: '16rem' }}>
                        <Card.Img variant="top" src="https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T2/images/I/51c1zFDNVmL._AC_SX679_.jpg" />
                        <Card.Body>
                            <Card.Title>Card Title</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card title and make up the
                                bulk of the card's content.
                            </Card.Text>
                            <Button variant="primary">Go somewhere</Button>
                        </Card.Body>
                    </Card>
                    <Card style={{ width: '16rem' }}>
                        <Card.Img variant="top" src="https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T2/images/I/51c1zFDNVmL._AC_SX679_.jpg" />
                        <Card.Body>
                            <Card.Title>Card Title</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card title and make up the
                                bulk of the card's content.
                            </Card.Text>
                            <Button variant="primary">Go somewhere</Button>
                        </Card.Body>
                    </Card>
                    <Card style={{ width: '16rem' }}>
                        <Card.Img variant="top" src="https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T2/images/I/51c1zFDNVmL._AC_SX679_.jpg" />
                        <Card.Body>
                            <Card.Title>Card Title</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card title and make up the
                                bulk of the card's content.
                            </Card.Text>
                            <Button variant="primary">Go somewhere</Button>
                        </Card.Body>
                    </Card>
                    <Card style={{ width: '16rem' }}>
                        <Card.Img variant="top" src="https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T2/images/I/51c1zFDNVmL._AC_SX679_.jpg" />
                        <Card.Body>
                            <Card.Title>Card Title</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card title and make up the
                                bulk of the card's content.
                            </Card.Text>
                            <Button variant="primary">Go somewhere</Button>
                        </Card.Body>
                    </Card>
                    <Card style={{ width: '16rem' }}>
                        <Card.Img variant="top" src="https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T2/images/I/51c1zFDNVmL._AC_SX679_.jpg" />
                        <Card.Body>
                            <Card.Title>Card Title</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card title and make up the
                                bulk of the card's content.
                            </Card.Text>
                            <Button variant="primary">Go somewhere</Button>
                        </Card.Body>
                    </Card>

                </Col>
                <PaginationExample />
                {/* <Col className='marginLeft mt-5 mb-5'>
                    <input type={'search'} placeholder='Search' className='searchWidth'></input>
                </Col> */}
            </Row>

            <Footer />
        </body>
    )
}
