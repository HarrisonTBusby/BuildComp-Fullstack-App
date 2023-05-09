import React, { useState } from 'react';
import NavbarComponent from '../Navbar/Navbar';
import { Col, Dropdown, InputGroup, OverlayTrigger, Tooltip, Button } from 'react-bootstrap';
import Footer from '../Footer/Footer';
import { PaginationExample } from '../Pagination/Pagination';
import 'bootstrap/dist/css/bootstrap.min.css';
import { saveToLocalStorageByName } from '../../Services/LocalStorage';
import { useWindowSize } from '../../HelperFunctions';

export default function BestBuilds() {

    type Component = 'Cpu' | 'Gpu' | 'Motherboard' | 'Case' | 'RAM' | 'Power Supply' | 'Heat Sink' | 'Hard Drives';
    const [selectedComponent, setSelectedComponent] = useState<Component>('Cpu');
    const [minBudget, setMinBudget] = useState<string>('');
    const [maxBudget, setMaxBudget] = useState<string>('');
    const size = useWindowSize();
    
    // For Dropdown values
    const handleComponentSelection = (component: Component) => {
        setSelectedComponent(component);
        //console.log(selectedComponent);
    };

    // For ToolTip on Dropdown
    const renderTooltip = (content: string) => {
        return <Tooltip id='button-tooltip'>{content}</Tooltip>;
    };

    // For Budget values
    const handleMinBudget = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key == 'Enter') {
            setMinBudget(event.currentTarget.value);
            //console.log(minBudget)
        }
    };

    const handleMaxBudget = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key == 'Enter') {

            setMaxBudget(event.currentTarget.value);
            //console.log(maxBudget)
        }
    };

    return (
        <div>
            <NavbarComponent />
            <div className='d-flex gutterless mt-5 bb-content'>
                {size < 768 ? (
                    <Dropdown className='my-4 mx-5'>
                        <Dropdown.Toggle >
                            Filters
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Col className='filterBackground p-3' md={3}>
                                <div className='marginLeft2 filterBoxColor'>
                                <Col className='marginLeft mt-5 mb-5'>
                                    <p>Component</p>
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
                        </Col>
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
                        <Col className='marginLeft mt-5 mb-5'>
                        <p>Component</p>
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
                        </Col>
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
                        <Button>Apply filters</Button>
                    </div>
                </Col>
                <Col md={9} className='cards px-2'>
                    <PaginationExample />
                </Col>
            </div>
            <Footer />
        </div>
    )
};
