// import { Col, Dropdown, InputGroup, OverlayTrigger, Tooltip, Button, Card } from 'react-bootstrap';
// import React, { ComponentType, useEffect, useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';


// export default function GpuFilter() {
//     const [minBudget, setMinBudget] = useState<string>('');
//     const [maxBudget, setMaxBudget] = useState<string>('');

//     const renderTooltip = (content: string) => {
//         return <Tooltip id='button-tooltip'>{content}</Tooltip>;
//     };

//     const handleMinBudget = (event: React.KeyboardEvent<HTMLInputElement>) => {
//         if (event.key == 'Enter') {
//             setMinBudget(event.currentTarget.value);
//         }
//     };

//     const handleMaxBudget = (event: React.KeyboardEvent<HTMLInputElement>) => {
//         if (event.key == 'Enter') {
//             setMaxBudget(event.currentTarget.value);
//         }
//     };

//   return (
//     <Col className='filterBackground large-filter p-3' md={3}>
//     <div className='marginLeft2 filterBoxColor'>
//     <button onClick={() => sortByPrice(cpuData)}>SORT BY PRICE</button>
//         <Col className='marginLeft mt-5 mb-5'>
//         <p className='mt-5'>Components</p>
//         <Dropdown className='bb-dropdown'>
//             <Dropdown.Toggle className='dropdownSize'>
//                 PC Components
//             </Dropdown.Toggle>

//             <Dropdown.Menu>
//                 <OverlayTrigger placement="right" overlay={renderTooltip('Provides the instructions and processing power the computer needs to do its work. The more powerful and updated your processor, the faster your computer can complete its tasks.')}>
//                     <Dropdown.Item onClick={() => handleComponentSelect('Cpu')} className='ddButton'>CPU</Dropdown.Item>
//                 </OverlayTrigger>
//                 <OverlayTrigger placement="right" overlay={renderTooltip('Helps handle graphics-related work like graphics, effects, and videos')}>
//                     <Dropdown.Item onClick={() => handleComponentSelect('Gpu')} className='ddButton'>GPU</Dropdown.Item>
//                 </OverlayTrigger>
//                 <OverlayTrigger placement="right" overlay={renderTooltip('The circuit board that connects all of your hardware to your processor, distributes electricity from your power supply, and defines the types of storage devices, memory modules, and graphics cards (among other expansion cards) that can connect to your PC.')}>
//                     <Dropdown.Item onClick={() => handleComponentSelect('Motherboard')} className='ddButton'>Motherboard</Dropdown.Item>
//                 </OverlayTrigger>
//                 <OverlayTrigger placement="right" overlay={renderTooltip('Container for all PC Components')}>
//                     <Dropdown.Item onClick={() => handleComponentSelect('Case')} className='ddButton'>Case</Dropdown.Item>
//                 </OverlayTrigger>
//                 <OverlayTrigger placement="right" overlay={renderTooltip('RAMs purpose is to store the short term data that a PC requires to properly operate.')}>
//                     <Dropdown.Item onClick={() => handleComponentSelect('Ram')} className='ddButton'>RAM</Dropdown.Item>
//                 </OverlayTrigger>
//                 <OverlayTrigger placement="right" overlay={renderTooltip('Pulls power from your wall outlet and distribute it throughout your PC.')}>
//                     <Dropdown.Item onClick={() => handleComponentSelect('Ps')} className='ddButton'>Power Supply</Dropdown.Item>
//                 </OverlayTrigger>
//                 <OverlayTrigger placement="right" overlay={renderTooltip('Properly removes heat from device components to improve device performance and extend its life. And usually, a heat sink incorporates a fan or other mechanism to reduce the temperature of a hardware component, such as a processor.')}>
//                     <Dropdown.Item onClick={() => handleComponentSelect('Heatsink')} className='ddButton'>Heat Sink</Dropdown.Item>
//                 </OverlayTrigger>
//                 <OverlayTrigger placement="right" overlay={renderTooltip('A hard drive is the hardware component that stores all of your digital content. Your documents, pictures, music, videos, programs, application preferences, and operating system represent digital content stored on a hard drive.')}>
//                     <Dropdown.Item onClick={() => handleComponentSelect('HardDrive')} className='ddButton'>Hard Drives</Dropdown.Item>
//                 </OverlayTrigger>
//             </Dropdown.Menu>
//         </Dropdown>
//         </Col>
//         <p className='mt-4'>Filter</p>
//         <button className='clearFiltersBtn'>Clear Filters</button>
//         <hr />
//         {/* Budget */}
//         {/* ====================================================================== */}
//         <p>Budget</p>
//         <input className='w-75' type='number' placeholder='Min' value={minBudget} onKeyDown={handleMinBudget} onChange={(event) => setMinBudget(event.currentTarget.value)}></input>
//         <input className='w-75' type='number' placeholder='Max' value={maxBudget} onKeyDown={handleMaxBudget} onChange={(event) => setMaxBudget(event.currentTarget.value)}></input>
//         {/* PC Components */}
//         {/* ====================================================================== */}
        
//         {/* Better Price or Better Performance */}
//         {/* ================================================== */}
//         <p className='mt-5'>Better Price or Better Performance</p>
//         <InputGroup className="mb-3">
//             <InputGroup.Checkbox />Better price
//         </InputGroup>
//         <InputGroup className="mb-3">
//             <InputGroup.Checkbox />Better performance
//         </InputGroup>
//     </div>
// </Col>
//   )
// }

