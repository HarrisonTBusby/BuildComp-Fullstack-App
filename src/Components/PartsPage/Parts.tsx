import React, { useEffect, useState } from 'react';
import NavbarComponent from '../Navbar/Navbar';
import { Col, Dropdown, InputGroup, OverlayTrigger, Tooltip, Button, Card } from 'react-bootstrap';
import Footer from '../Footer/Footer';
import { PaginationExample } from '../Pagination/Pagination';
import 'bootstrap/dist/css/bootstrap.min.css';
import { saveToLocalStorageByName } from '../../Services/LocalStorage';
import { useWindowSize } from '../../HelperFunctions';
import { GetPartData } from '../../Services/DataService';
import Paginate from "react-paginate";
import { CpuInfo } from 'os';
import { NumberLiteralType } from 'typescript';
import { Link, useNavigate } from 'react-router-dom';
import { autocompleteClasses } from '@mui/material';

interface CpuData {
    cores: number;
    id: number;
    image_url: string;
    item_url: string;
    perfCoreClock: number;
    price: string;
    socketType: string;
    title: string;
    type: string
}

interface GPUData {
    id: number;
    title: string;
    price: string;
    image_url: string;
    item_url: string;
    type: string;
    socketType: string;
    memory: number;
    perfCoreClock: number;
    chipset: string;
}

interface CaseData {
    id: number;
    title: string;
    price: string;
    image_url: string;
    item_url: string;
    type: string;
    size: string;
    caseColor: string;
}

interface HardDriveData {
    id: number;
    title: string;
    price: string;
    image_url: string;
    item_url: string;
    type: string;
    storageCapacity: string;
    PCIeType: string;
}

interface MotherboardData {
    id: number;
    title: string;
    price: string;
    image_url: string;
    item_url: string;
    type: string;
    socketType: string;
    gpuPort: string;
    ramType: string;
    ramMax: number;
    memorySlots: number;
    chipset: string;
    PCIeSlotNumber: number;
}

interface HeatsinkData {
    id: number;
    title: string;
    price: string;
    image_url: string;
    item_url: string;
    type: string;
    color: string;
    fanRPM: string;
    fanNoise: number;
    isWaterCooled: boolean;
}

interface PowerSupplyData {
    id: number;
    title: string;
    price: string;
    image_url: string;
    item_url: string;
    type: string;
    wattage: number;
    color: string;
    EPS8ConnectorNum: number;
    PCIe62ConnectorNum: number;
    PCIe6ConnectorNum: number;
    SataConnectors: number;
    Molex4ConnectorNum: number;
}

interface RamData {
    id: number;
    title: string;
    price: string;
    image_url: string;
    item_url: string;
    type: string;
    color: string;
    ramType: string;
    ramSpeed: string;
    moduleAmount: string;
    firstWordLatency: number;
}

// interface AllCpuData {
//     data: CpuData[]
// }

export default function Parts() {
    const navigate = useNavigate();

    const dummyData = {
        data: [{
            cores: 64,
            id: 1,
            image_url: 'https',
            item_url: 'https',
            perfCoreClock: 6.5,
            price: '199',
            socketType: 'AM7',
            title: 'AMD Ryzen 99',
            type: 'CPU'
        }]
    }

    type Component = 'Cpu' | 'Gpu' | 'Motherboard' | 'Case' | 'RAM' | 'Power Supply' | 'Heat Sink' | 'Hard Drive';
    const [selectedComponent, setSelectedComponent] = useState<Component | null>(null);
    const [minBudget, setMinBudget] = useState<string>('');
    const [maxBudget, setMaxBudget] = useState<string>('');
    const size = useWindowSize();
    const [componentData, setComponentData] = useState<Component[]>([]);
    const [cpuData, setCpuData] = useState<CpuData[]>([]);
    const [gpuData, setGpuData] = useState<GPUData[]>([]);
    const [motherboardData, setMotherboardData] = useState<MotherboardData[]>([]);
    const [caseData, setCaseData] = useState<CaseData[]>([]);
    const [ramData, setRamData] = useState<RamData[]>([]);
    const [psData, setPsData] = useState<PowerSupplyData[]>([]);
    const [heatsinkData, setHeatsinkData] = useState<HeatsinkData[]>([]);
    const [hardDriveData, setHardDriveData] = useState<HardDriveData[]>([]);

    // For Dropdown values
    function handleComponentSelect(component: Component) {
        // When a new component is selected, clear the data for any previously selected component
        setSelectedComponent(component);
        setComponentData([]);

        switch (component) {
            case 'Cpu':
                setCpuData([]);
                break;
            case 'Gpu':
                setGpuData([]);
                break;
            case 'Motherboard':
                setMotherboardData([]);
                break;
            case 'Power Supply':
                setPsData([]);
                break;
            case 'Case':
                setCaseData([]);
                break;
            case 'Heat Sink':
                setHeatsinkData([]);
                break;
            case 'Hard Drive':
                setHardDriveData([]);
                break;
            case 'RAM':
                setRamData([]);
                break;
            default:
                break;
        }
        fetchData();
    }


    async function fetchData() {
        if (!selectedComponent) {
            return;
        }

        let data;

        switch (selectedComponent) {
            case 'Cpu':
                data = await GetPartData('Cpu');
                setCpuData(data);
                break;
            case 'Gpu':
                data = await GetPartData('Gpu');
                setGpuData(data);
                break;
            case 'Motherboard':
                data = await GetPartData('Motherboard');
                setMotherboardData(data);
                break;
            case 'Power Supply':
                data = await GetPartData('Ps');
                setPsData(data);
                break;
            case 'Case':
                data = await GetPartData('Case');
                setCaseData(data);
                break;
            case 'Heat Sink':
                data = await GetPartData('Heatsink');
                setHeatsinkData(data);
                break;
            case 'Hard Drive':
                data = await GetPartData('HardDrive');
                setHardDriveData(data);
                break;
            case 'RAM':
                data = await GetPartData('Ram');
                setRamData(data);
                break;
            default:
                break;
        }

        setComponentData(data);
        console.log(data)
    }
    //HandlesPaginationButtons
    const handlePageChange = (selectedPage: { selected: number }) => {
        setCurrentPage(selectedPage.selected);
    };

    const [currentPage, setCurrentPage] = useState<number>(0);

    const ITEMS_PER_PAGE = 6;

    let cpuSize = cpuData.length;
    const TOTAL_ITEMS = cpuSize;

    const totalPages = Math.ceil(TOTAL_ITEMS / ITEMS_PER_PAGE);

    //WHY ONLY WORK ON TYPE ANY!? NEEDS FIX AHHH!!!
    const ItemList = ({ cpuData }: any) => {
        const startIndex = currentPage * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        const itemsToDisplay = cpuData.slice(startIndex, endIndex);

        return (
            <div className='cards'>
                {itemsToDisplay.map((item: CpuData) => (
                    <div key={item.id}>
                        <Card style={{ width: '16rem', height: '100%' }}>
                            <Card.Img variant="top" src={item.image_url} style={{ width: 'auto', height: "254px" }} />
                            <Card.Body>
                                <Link to={item.item_url} target='_blank'><u>{item.title}</u></Link>
                                <div>
                                    <div>${item.price}</div>
                                    <div>Cores: {item.cores}</div>
                                    <div>Performance Clock: {item.perfCoreClock}</div>
                                    <div>{item.type}</div>
                                </div>

                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>
        );
    };

    //useEffect(() => {
    //const HandleGetData = async () => {
    //const data = await GetPartData("Cpu")
    //setCpuData(data)


    // console.log(data)
    //console.log(cpuData)
    //console.log('why');
    //}

    //HandleGetData()
    //console.log(cpuData)
    // }, [])

    //console.log('once')
    //HandleGetData()

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
                                        <input type={'search'} placeholder='Search' className='w-100 searchWidth'></input>
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
                                    <Dropdown className='bb-dropdown'>
                                        <Dropdown.Toggle className='dropdownSize'>
                                            PC Components
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu >
                                            <OverlayTrigger placement="right" overlay={renderTooltip('Provides the instructions and processing power the computer needs to do its work. The more powerful and updated your processor, the faster your computer can complete its tasks.')}>
                                                <Dropdown.Item onClick={() => handleComponentSelect('Cpu')} className='ddButton'>CPU</Dropdown.Item>
                                            </OverlayTrigger>
                                            <OverlayTrigger placement="right" overlay={renderTooltip('Helps handle graphics-related work like graphics, effects, and videos')}>
                                                <Dropdown.Item onClick={() => handleComponentSelect('Gpu')} className='ddButton'>GPU</Dropdown.Item>
                                            </OverlayTrigger>
                                            <OverlayTrigger placement="right" overlay={renderTooltip('The circuit board that connects all of your hardware to your processor, distributes electricity from your power supply, and defines the types of storage devices, memory modules, and graphics cards (among other expansion cards) that can connect to your PC.')}>
                                                <Dropdown.Item onClick={() => handleComponentSelect('Motherboard')} className='ddButton'>Motherboard</Dropdown.Item>
                                            </OverlayTrigger>
                                            <OverlayTrigger placement="right" overlay={renderTooltip('Container for all PC Components')}>
                                                <Dropdown.Item onClick={() => handleComponentSelect('Case')} className='ddButton'>Case</Dropdown.Item>
                                            </OverlayTrigger>
                                            <OverlayTrigger placement="right" overlay={renderTooltip('RAMs purpose is to store the short term data that a PC requires to properly operate.')}>
                                                <Dropdown.Item onClick={() => handleComponentSelect('RAM')} className='ddButton'>RAM</Dropdown.Item>
                                            </OverlayTrigger>
                                            <OverlayTrigger placement="right" overlay={renderTooltip('Pulls power from your wall outlet and distribute it throughout your PC.')}>
                                                <Dropdown.Item onClick={() => handleComponentSelect('Power Supply')} className='ddButton'>Power Supply</Dropdown.Item>
                                            </OverlayTrigger>
                                            <OverlayTrigger placement="right" overlay={renderTooltip('Properly removes heat from device components to improve device performance and extend its life. And usually, a heat sink incorporates a fan or other mechanism to reduce the temperature of a hardware component, such as a processor.')}>
                                                <Dropdown.Item onClick={() => handleComponentSelect('Heat Sink')} className='ddButton'>Heat Sink</Dropdown.Item>
                                            </OverlayTrigger>
                                            <OverlayTrigger placement="right" overlay={renderTooltip('A hard drive is the hardware component that stores all of your digital content. Your documents, pictures, music, videos, programs, application preferences, and operating system represent digital content stored on a hard drive.')}>
                                                <Dropdown.Item onClick={() => handleComponentSelect('Hard Drive')} className='ddButton'>Hard Drives</Dropdown.Item>
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
                        <Col className='marginLeft mt-5 mb-5'>
                            <input type={'search'} placeholder='Search' className='w-100 searchWidth'></input>
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
                        <Dropdown className='bb-dropdown'>
                            <Dropdown.Toggle className='dropdownSize'>
                                PC Components
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <OverlayTrigger placement="right" overlay={renderTooltip('Provides the instructions and processing power the computer needs to do its work. The more powerful and updated your processor, the faster your computer can complete its tasks.')}>
                                    <Dropdown.Item onClick={() => handleComponentSelect('Cpu')} className='ddButton'>CPU</Dropdown.Item>
                                </OverlayTrigger>
                                <OverlayTrigger placement="right" overlay={renderTooltip('Helps handle graphics-related work like graphics, effects, and videos')}>
                                    <Dropdown.Item onClick={() => handleComponentSelect('Gpu')} className='ddButton'>GPU</Dropdown.Item>
                                </OverlayTrigger>
                                <OverlayTrigger placement="right" overlay={renderTooltip('The circuit board that connects all of your hardware to your processor, distributes electricity from your power supply, and defines the types of storage devices, memory modules, and graphics cards (among other expansion cards) that can connect to your PC.')}>
                                    <Dropdown.Item onClick={() => handleComponentSelect('Motherboard')} className='ddButton'>Motherboard</Dropdown.Item>
                                </OverlayTrigger>
                                <OverlayTrigger placement="right" overlay={renderTooltip('Container for all PC Components')}>
                                    <Dropdown.Item onClick={() => handleComponentSelect('Case')} className='ddButton'>Case</Dropdown.Item>
                                </OverlayTrigger>
                                <OverlayTrigger placement="right" overlay={renderTooltip('RAMs purpose is to store the short term data that a PC requires to properly operate.')}>
                                    <Dropdown.Item onClick={() => handleComponentSelect('RAM')} className='ddButton'>RAM</Dropdown.Item>
                                </OverlayTrigger>
                                <OverlayTrigger placement="right" overlay={renderTooltip('Pulls power from your wall outlet and distribute it throughout your PC.')}>
                                    <Dropdown.Item onClick={() => handleComponentSelect('Power Supply')} className='ddButton'>Power Supply</Dropdown.Item>
                                </OverlayTrigger>
                                <OverlayTrigger placement="right" overlay={renderTooltip('Properly removes heat from device components to improve device performance and extend its life. And usually, a heat sink incorporates a fan or other mechanism to reduce the temperature of a hardware component, such as a processor.')}>
                                    <Dropdown.Item onClick={() => handleComponentSelect('Heat Sink')} className='ddButton'>Heat Sink</Dropdown.Item>
                                </OverlayTrigger>
                                <OverlayTrigger placement="right" overlay={renderTooltip('A hard drive is the hardware component that stores all of your digital content. Your documents, pictures, music, videos, programs, application preferences, and operating system represent digital content stored on a hard drive.')}>
                                    <Dropdown.Item onClick={() => handleComponentSelect('Hard Drive')} className='ddButton'>Hard Drives</Dropdown.Item>
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
                        <Button>Apply filters</Button>
                    </div>
                </Col>
                <Col md={9} className='px-2'>
                    {/* <PaginationExample /> */}
                    <div className="">
                        <ItemList cpuData={cpuData} />
                        <div className="d-flex justify-content-center mt-4">
                            <Paginate
                                previousLabel={"<"}
                                nextLabel={">"}
                                pageCount={totalPages}
                                onPageChange={handlePageChange}
                                containerClassName={"pagination"}
                                activeClassName={"active-page"}
                            />
                        </div>
                    </div>
                </Col>
            </div>
            <Footer />
        </div>
    )
};
