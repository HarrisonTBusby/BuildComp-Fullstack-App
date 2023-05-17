import React, { ComponentType, useEffect, useState } from 'react';
import NavbarComponent from '../Navbar/Navbar';
import { Col, Dropdown, InputGroup, OverlayTrigger, Tooltip, Button, Card } from 'react-bootstrap';
import Footer from '../Footer/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import { saveToLocalStorageByName } from '../../Services/LocalStorage';
import { useWindowSize } from '../../HelperFunctions';
import { GetPartData } from '../../Services/DataService';
import Paginate from "react-paginate";
import { CpuInfo } from 'os';
import { NumberLiteralType } from 'typescript';
import { Link, useNavigate } from 'react-router-dom';
import { autocompleteClasses } from '@mui/material';
import CaseList from '../Lists/CaseList';
import CpuList from '../Lists/CpuList';
import GpuList from '../Lists/GpuList';
import MotherboardList from '../Lists/MotherboardList';
import HardDriveList from '../Lists/HardDriveList';
import HeatsinkList from '../Lists/HeatsinkList';
import PsList from '../Lists/PsList';
import RamList from '../Lists/RamList';
import { CpuData, GpuData, CaseData, HardDriveData, MotherboardData, HeatsinkData, PowerSupplyData, RamData } from '../../Interfaces/PartDataInterfaces';

export default function Parts() {
    const navigate = useNavigate();
    const size = useWindowSize();

    const [currentPage, setCurrentPage] = useState<number>(0);

    const [selectedComponent, setSelectedComponent] = useState<string>('');
    const [minBudget, setMinBudget] = useState<number>(0);
    const [maxBudget, setMaxBudget] = useState<number>(0);
    const [componentData, setComponentData] = useState<any[]>([]);
    const [cpuData, setCpuData] = useState<CpuData[]>([]);
    const [originalCpuData, setOriginalCpuData] = useState<CpuData[]>([]);
    const [gpuData, setGpuData] = useState<GpuData[]>([]);
    const [caseData, setCaseData] = useState<CaseData[]>([]);
    const [motherboardData, setMotherboardData] = useState<MotherboardData[]>([]);
    const [ramData, setRamData] = useState<RamData[]>([]);
    const [psData, setPsData] = useState<PowerSupplyData[]>([]);
    const [heatsinkData, setHeatsinkData] = useState<HeatsinkData[]>([]);
    const [hardDriveData, setHardDriveData] = useState<HardDriveData[]>([]);

    const [cpuManufacturers, setCpuManufacturers] = useState([{ All: true, AMD: false, Intel: false }])
    const [cpuSocket, setCpuSocket] = useState({ All: true, AM4: false, LGA1150: false, LGA1151: false, LGA1155: false, LGA1200: false, LGA1700: false, LGA2011: false })

    const [cpuFilters, setCpuFilters] = useState({
        manufacturers: { All: true, AMD: false, Intel: false },
        socketTypes: { All: true, AM4: false, LGA1150: false, LGA1151: false, LGA1155: false, LGA1200: false, LGA1700: false, LGA2011: false }
    });

    const [totalItems, setTotalItems] = useState(0);

    const [componentType, setComponentType] = useState<string>('default');
    // For Dropdown values
    async function handleComponentSelect(component: string) {

        const data = await GetPartData(component);
        if (component === "Cpu") {
            setCpuData(data);
            setTotalItems(data.length)
            setComponentType('Cpu')
        } else if (component === "Gpu") {
            setGpuData(data);
            setTotalItems(data.length)
            setComponentType('Gpu')
        } else if (component === "Motherboard") {
            setMotherboardData(data);
            setTotalItems(data.length)
            setComponentType('Motherboard')
        } else if (component === "Case") {
            setCaseData(data)
            setTotalItems(data.length)
            setComponentType('Case')
        } else if (component === "Ram") {
            setRamData(data)
            setTotalItems(data.length)
            setComponentType('Ram')
        } else if (component === 'Ps') {
            setPsData(data)
            setTotalItems(data.length)
            setComponentType('Ps')
        } else if (component === "Heatsink") {
            setHeatsinkData(data)
            setTotalItems(data.length)
            setComponentType('Heatsink')
        } else if (component === "HardDrive") {
            setTotalItems(data.length)
            setHardDriveData(data)
            setComponentType('HardDrive')
        }
        // setCpuManufacturers([{
        //     All: true,
        //     AMD: false,
        //     Intel: false
        // }])

    }

    useEffect(() => {
        async function getData() {
            const data = await GetPartData('Cpu');
            setOriginalCpuData(data);
            setCpuData(data);
            setTotalItems(data.length)
            setComponentType('Cpu')
        }
        getData()
        
    }, [])

    //HandlesPaginationButtons
    const handlePageChange = (selectedPage: { selected: number }) => {
        setCurrentPage(selectedPage.selected);
    };

    const ITEMS_PER_PAGE = 6;

    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

    const SwitchComponent = () => {
        switch (componentType) {
            case 'Cpu':
                return <CpuList cpuData={cpuData} currentPage={currentPage} setCurrentPage={setCurrentPage}/>;
            case 'Gpu':
                return <GpuList gpuData={gpuData} currentPage={currentPage} setCurrentPage={setCurrentPage} />;
            case 'Motherboard':
                return <MotherboardList motherboardData={motherboardData} currentPage={currentPage} setCurrentPage={setCurrentPage} />;
            case 'Case':
                return <CaseList caseData={caseData} currentPage={currentPage} setCurrentPage={setCurrentPage} />;
            case 'Ram':
                return <RamList ramData={ramData} currentPage={currentPage} setCurrentPage={setCurrentPage} />;
            case 'Ps':
                return <PsList psData={psData} currentPage={currentPage} setCurrentPage={setCurrentPage} />;
            case 'Heatsink':
                return <HeatsinkList heatsinkData={heatsinkData} currentPage={currentPage} setCurrentPage={setCurrentPage} />;
            case 'HardDrive':
                return <HardDriveList hardDriveData={hardDriveData} currentPage={currentPage} setCurrentPage={setCurrentPage} />;
            default:
                return null;
        }
    }

    // For ToolTip on Dropdown
    const renderTooltip = (content: string) => {
        return <Tooltip id='button-tooltip'>{content}</Tooltip>;
    };

    // For Budget values
    const handleMinBudget = (value: number) => {
        setMinBudget(value);
    };

    const handleMaxBudget = (value: number) => {
        setMaxBudget(value);
    };

    // const handleCpuManufacturer = () => {
    //     if (cpuManufacturers[0]['All'] === true) {
    //         setCpuData(originalCpuData)
    //         setTotalItems(originalCpuData.length)
    //     } else {
    //         let data: any = [];

    //         const filteredData = cpuData.filter((cpu: { title: string, index?: number }) => {
    //             let included = false;
    //             Object.keys(cpuManufacturers[0]).forEach(key => {
    //                 if (cpu.title.includes(key) && cpuManufacturers[0][key as keyof typeof cpuManufacturers[0]]) {
    //                     included = true;
    //                 }
    //             });
    //             return included;
    //         }).map((cpu) => {
    //             return cpu;
    //         });

    //         data = [...data, filteredData]

    //         setCpuData(filteredData);
    //         setTotalItems(filteredData.length)
    //     }
    // }

    const handleCpuFiltersCheckbox = () => {
        if (cpuFilters.manufacturers.All && cpuFilters.socketTypes.All) {
            setCpuData(originalCpuData);
            setTotalItems(originalCpuData.length);
        } else if (cpuFilters.manufacturers.All && !cpuFilters.socketTypes.All) {

            let data: any[] = [];
            const filteredData = originalCpuData.filter((cpu: { socketType: string, index?: number }) => {
                let included = false;
                const { socketTypes } = cpuFilters;

                Object.keys(socketTypes).forEach((key) => {
                    if (cpu.socketType.includes(key) && socketTypes[key as keyof typeof socketTypes]) {
                        included = true;
                    }
                });

                return included;
            }).map((cpu) => {
                return cpu;
            });

            data = [...data, filteredData];

            setCpuData(filteredData);
            setTotalItems(filteredData.length);

        } else if (!cpuFilters.manufacturers.All && cpuFilters.socketTypes.All) {
            let data: any[] = [];
            const filteredData = originalCpuData.filter((cpu: { title: string, index?: number }) => {
                let included = false;
                const { manufacturers } = cpuFilters;

                Object.keys(manufacturers).forEach((key) => {
                    if (cpu.title.includes(key) && manufacturers[key as keyof typeof manufacturers]) {
                        included = true;
                    }
                });

                return included;
            }).map((cpu) => {
                return cpu;
            });

            data = [...data, filteredData];

            setCpuData(filteredData);
            setTotalItems(filteredData.length);

        
        }
   
        else if(!cpuFilters.manufacturers.All && !cpuFilters.socketTypes.All){
            let data = originalCpuData.filter((cpu: { title: string, index?: number }) => {
                let included = false;
                const { manufacturers } = cpuFilters;

                Object.keys(manufacturers).forEach((key) => {
                    if (cpu.title.includes(key) && manufacturers[key as keyof typeof manufacturers]) {
                        included = true;
                    }
                });

                return included;
            }).map((cpu) => {
                return cpu;
            });

            data = data.filter((cpu: { socketType: string, index?: number }) => {
                let included = false;
                const { socketTypes } = cpuFilters;

                Object.keys(socketTypes).forEach((key) => {
                    if (cpu.socketType.includes(key) && socketTypes[key as keyof typeof socketTypes]) {
                        included = true;
                    }
                });

                return included;
            }).map((cpu) => {
                return cpu;
            });

            setCpuData(data);
            setTotalItems(data.length);
            console.log(data)
        }
        setCurrentPage(1)
    }

    // const handleCpuSocketType = () => {
    //     if (cpuSocket.All === true) {
    //         setCpuData(originalCpuData);
    //         setTotalItems(originalCpuData.length);
    //     } else {
    //         let data: any[] = [];

    //         const filteredData = cpuData.filter((cpu: { socketType: string, index?: number }) => {
    //             let included = false;
    //             Object.keys(cpuSocket).forEach((key) => {
    //                 if (cpu.socketType.includes(key) && cpuSocket[key as keyof typeof cpuSocket]) {
    //                     included = true;
    //                 }
    //             });
    //             return included;
    //         }).map((cpu) => {
    //             //cpu.index = index;
    //             return cpu;
    //         });

    //         data = [...data, filteredData];

    //         setCpuData(filteredData);
    //         setTotalItems(filteredData.length);
    //     }
    // }

    useEffect(() => {
        if (componentType === 'Cpu') {
            handleCpuFiltersCheckbox()
        } else if (componentType === 'Gpu') {
            setGpuData(sortByPrice(gpuData));
        } else if (componentType === "Motherboard") {
            setMotherboardData(sortByPrice(motherboardData));
        } else if (componentType === "Case") {
            setCaseData(sortByPrice(caseData));
        } else if (componentType === "Ram") {
            setRamData(sortByPrice(ramData));
        } else if (componentType === "Ps") {
            setPsData(sortByPrice(psData));
        } else if (componentType === "Heatsink") {
            setHeatsinkData(sortByPrice(heatsinkData));
        } else {
            setHardDriveData(sortByPrice(hardDriveData));
        }
    }, [cpuFilters])

    function sortByPrice(arr: any) {
        const newArr = [...arr];
        newArr.sort((a: any, b: any) => {
            if (parseFloat(a.price) < parseFloat(b.price)) {
                return -1
            }
            if (parseFloat(a.price) > parseFloat(b.price)) {
                return 1;
            }
            return 0;
        })

        return newArr
    }

    const priceSort = () => {
        if (componentType == 'Cpu') {
            setCpuData(sortByPrice(cpuData));
            setTotalItems(cpuData.length)
        } else if (componentType == 'Gpu') {
            setGpuData(sortByPrice(gpuData));
        } else if (componentType == "Motherboard") {
            setMotherboardData(sortByPrice(motherboardData));
        } else if (componentType == "Case") {
            setCaseData(sortByPrice(caseData));
        } else if (componentType == "Ram") {
            setRamData(sortByPrice(ramData));
        } else if (componentType == "Ps") {
            setPsData(sortByPrice(psData));
        } else if (componentType == "Heatsink") {
            setHeatsinkData(sortByPrice(heatsinkData));
        } else {
            setHardDriveData(sortByPrice(hardDriveData));
        }
    }

    const allFalse = cpuManufacturers.every((manufacturer) => !Object.values(manufacturer).some((isChecked) => isChecked));
    if (allFalse) {
        setCpuManufacturers([{ All: true, AMD: false, Intel: false }])
    }

    const isAllSocketTypesFalse = Object.values(cpuFilters.socketTypes).every(value => value === false);
    if (isAllSocketTypesFalse) {
        setCpuFilters((prev) => ({
            ...prev,
            socketTypes: { ...prev.socketTypes, All: true }
        }))
    }

    const isAllManufacturerTypesFalse = Object.values(cpuFilters.manufacturers).every(value => value === false);
    if (isAllManufacturerTypesFalse) {
        setCpuFilters((prev) => ({
            ...prev,
            manufacturers: { ...prev.manufacturers, All: true }
        }))
    }

    //Checkbox logic
    const handleCheckboxChange = (value: string, checked: boolean) => {
        if (value === "ManufacturerAll") {
            setCpuManufacturers([{ All: true, AMD: false, Intel: false }])
        }

        if (value === "AMD") {
            setCpuManufacturers((prev) => [
                {
                    ...prev[0],
                    AMD: checked,
                    All: false
                }
            ]);
        }

        if (value === "Intel") {
            setCpuManufacturers((prev) => [
                {
                    ...prev[0],
                    Intel: checked,
                    All: false
                }
            ]);
        }
    };

    const handleCpuManufacturerCheckbox = (value: string, checked: boolean) => {
        if (value === 'ManufacturerAll') {
            setCpuFilters((prev) => ({
                ...prev,
                manufacturers: { All: true, AMD: false, Intel: false }
            }))
        } else if (value === 'AMD') {
            setCpuFilters((prev) => ({
                ...prev,
                manufacturers: { ...prev.manufacturers, All: false, AMD: checked }
            }))
        } else if (value === 'Intel') {
            setCpuFilters((prev) => ({
                ...prev,
                manufacturers: { ...prev.manufacturers, All: false, Intel: checked }
            }))
        }
    }

    const handleCpuSocketCheckbox = (value: string, checked: boolean) => {
        if (value === 'SocketAll') {
            setCpuFilters((prev) => ({
                ...prev,
                socketTypes: { All: true, AM4: false, LGA1150: false, LGA1151: false, LGA1155: false, LGA1200: false, LGA1700: false, LGA2011: false },
            }))
        } else if (value === 'AM4') {
            setCpuFilters((prev) => ({
                ...prev,
                socketTypes: { ...prev.socketTypes, All: false, AM4: checked }
            }))
        } else if (value === 'LGA1150') {
            setCpuFilters((prev) => ({
                ...prev,
                socketTypes: { ...prev.socketTypes, All: false, LGA1150: checked }
            }))
        } else if (value === 'LGA1151') {
            setCpuFilters((prev) => ({
                ...prev,
                socketTypes: { ...prev.socketTypes, All: false, LGA1151: checked }
            }))
        } else if (value === 'LGA1155') {
            setCpuFilters((prev) => ({
                ...prev,
                socketTypes: { ...prev.socketTypes, All: false, LGA1155: checked }
            }))
        } else if (value === 'LGA1200') {
            setCpuFilters((prev) => ({
                ...prev,
                socketTypes: { ...prev.socketTypes, All: false, LGA1200: checked }
            }))
        } else if (value === 'LGA1700') {
            setCpuFilters((prev) => ({
                ...prev,
                socketTypes: { ...prev.socketTypes, All: false, LGA1700: checked }
            }))
        } else if (value === 'LGA2011') {
            setCpuFilters((prev) => ({
                ...prev,
                socketTypes: { ...prev.socketTypes, All: false, LGA2011: checked }
            }))
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
                                    <Button onClick={() => priceSort()}>SORT BY PRICE</Button>
                                    <Col className='marginLeft mt-5 mb-5'>
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
                                                    <Dropdown.Item onClick={() => handleComponentSelect('Ram')} className='ddButton'>RAM</Dropdown.Item>
                                                </OverlayTrigger>
                                                <OverlayTrigger placement="right" overlay={renderTooltip('Pulls power from your wall outlet and distribute it throughout your PC.')}>
                                                    <Dropdown.Item onClick={() => handleComponentSelect('Ps')} className='ddButton'>Power Supply</Dropdown.Item>
                                                </OverlayTrigger>
                                                <OverlayTrigger placement="right" overlay={renderTooltip('Properly removes heat from device components to improve device performance and extend its life. And usually, a heat sink incorporates a fan or other mechanism to reduce the temperature of a hardware component, such as a processor.')}>
                                                    <Dropdown.Item onClick={() => handleComponentSelect('Heatsink')} className='ddButton'>Heat Sink</Dropdown.Item>
                                                </OverlayTrigger>
                                                <OverlayTrigger placement="right" overlay={renderTooltip('A hard drive is the hardware component that stores all of your digital content. Your documents, pictures, music, videos, programs, application preferences, and operating system represent digital content stored on a hard drive.')}>
                                                    <Dropdown.Item onClick={() => handleComponentSelect('HardDrive')} className='ddButton'>Hard Drives</Dropdown.Item>
                                                </OverlayTrigger>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </Col>
                                    <Button onClick={() => priceSort()}>SORT BY PRICE</Button>
                                    <hr />
                                    <p className='mt-4'>Filter</p>
                                    <button onClick={() => handleComponentSelect(componentType)} className='clearFiltersBtn'>Clear Filters</button>
                                    <hr />
                                    <p>Budget</p>
                                    <input className='w-75' type='number' placeholder='Min' value={minBudget} onChange={(e) => setMinBudget(parseInt(e.target.value))}></input>
                                    <input className='w-75' type='number' placeholder='Max' value={maxBudget} onChange={(e) => setMaxBudget(parseInt(e.target.value))}></input>
                                    {/* <button onClick={() => filterByPriceRange(minBudget, maxBudget)} className='clearFiltersBtn'>Results</button> */}
                                    <hr />

                                    <p>Manufacturer</p>
                                    <div className='flex justify-content-center gap-2'>
                                        <label className='cursor-pointer'>
                                            <input
                                                type='checkbox'
                                                value='All'
                                                checked={cpuManufacturers[0]['All']}
                                                onChange={(e) => handleCheckboxChange(e.target.value, e.target.checked)}
                                                className='mr-3 cursor-pointer'
                                            />
                                            All
                                        </label>
                                    </div>
                                    <div className='flex justify-content-center gap-2'>
                                        <label className='cursor-pointer'>
                                            <input
                                                type='checkbox'
                                                value='AMD'
                                                checked={cpuManufacturers[0]['AMD']}
                                                onChange={(e) => handleCheckboxChange(e.target.value, e.target.checked)}
                                                className='mr-3 cursor-pointer'
                                            />
                                            AMD
                                        </label>
                                    </div>
                                    <div className='flex justify-content-center gap-2'>
                                        <label className='cursor-pointer'>
                                            <input
                                                type='checkbox'
                                                value='Intel'
                                                checked={cpuManufacturers[0]['Intel']}
                                                onChange={(e) => handleCheckboxChange(e.target.value, e.target.checked)}
                                                className='mr-3 cursor-pointer'
                                            />
                                            Intel
                                        </label>
                                    </div>
                                </div>
                            </Col>
                        </Dropdown.Menu>
                    </Dropdown>

                ) : (
                    ''
                )}
                <Col className='filterBackground large-filter p-3' md={3}>
                    <div className='marginLeft2 filterBoxColor'>

                        <Col className='marginLeft mt-5 mb-5'>
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
                                        <Dropdown.Item onClick={() => handleComponentSelect('Ram')} className='ddButton'>RAM</Dropdown.Item>
                                    </OverlayTrigger>
                                    <OverlayTrigger placement="right" overlay={renderTooltip('Pulls power from your wall outlet and distribute it throughout your PC.')}>
                                        <Dropdown.Item onClick={() => handleComponentSelect('Ps')} className='ddButton'>Power Supply</Dropdown.Item>
                                    </OverlayTrigger>
                                    <OverlayTrigger placement="right" overlay={renderTooltip('Properly removes heat from device components to improve device performance and extend its life. And usually, a heat sink incorporates a fan or other mechanism to reduce the temperature of a hardware component, such as a processor.')}>
                                        <Dropdown.Item onClick={() => handleComponentSelect('Heatsink')} className='ddButton'>Heat Sink</Dropdown.Item>
                                    </OverlayTrigger>
                                    <OverlayTrigger placement="right" overlay={renderTooltip('A hard drive is the hardware component that stores all of your digital content. Your documents, pictures, music, videos, programs, application preferences, and operating system represent digital content stored on a hard drive.')}>
                                        <Dropdown.Item onClick={() => handleComponentSelect('HardDrive')} className='ddButton'>Hard Drives</Dropdown.Item>
                                    </OverlayTrigger>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                        <Button onClick={() => priceSort()}>SORT BY PRICE</Button>
                        <hr />
                        <p className='mt-4'>Filter</p>
                        <button onClick={() => handleComponentSelect(componentType)} className='clearFiltersBtn'>Clear Filters</button>
                        <hr />
                        <p>Budget</p>
                        <input className='w-75' type='number' placeholder='Min' value={minBudget} onChange={(e) => setMinBudget(parseInt(e.target.value))}></input>
                        <input className='w-75' type='number' placeholder='Max' value={maxBudget} onChange={(e) => setMaxBudget(parseInt(e.target.value))}></input>
                        {/* <button onClick={() => filterByPriceRange(minBudget, maxBudget)} className='clearFiltersBtn'>Results</button> */}
                        <hr />
                        <p>Manufacturer</p>
                        <div className='flex justify-content-center gap-2'>
                            <label className='cursor-pointer'>
                                <input
                                    type='checkbox'
                                    value='ManufacturerAll'
                                    checked={cpuFilters.manufacturers.All}
                                    onChange={(e) => handleCpuManufacturerCheckbox(e.target.value, e.target.checked)}
                                    className='mr-3 cursor-pointer'
                                />
                                All
                            </label>
                        </div>
                        <div className='flex justify-content-center gap-2'>
                            <label className='cursor-pointer'>
                                <input
                                    type='checkbox'
                                    value='AMD'
                                    checked={cpuFilters.manufacturers.AMD}
                                    onChange={(e) => handleCpuManufacturerCheckbox(e.target.value, e.target.checked)}
                                    className='mr-3 cursor-pointer'
                                />
                                AMD
                            </label>
                        </div>
                        <div className='flex justify-content-center gap-2'>
                            <label className='cursor-pointer'>
                                <input
                                    type='checkbox'
                                    value='Intel'
                                    checked={cpuFilters.manufacturers.Intel}
                                    onChange={(e) => handleCpuManufacturerCheckbox(e.target.value, e.target.checked)}
                                    className='mr-3 cursor-pointer'
                                />
                                Intel
                            </label>
                        </div>

                        <hr></hr>
                        <p>Socket Type</p>
                        <div className='flex justify-content-center gap-2'>
                            <label className='cursor-pointer'>
                                <input
                                    type='checkbox'
                                    value='SocketAll'
                                    checked={cpuFilters.socketTypes.All}
                                    onChange={(e) => handleCpuSocketCheckbox(e.target.value, e.target.checked)}
                                    className='mr-3 cursor-pointer'
                                />
                                All
                            </label>
                        </div>
                        <div className='flex justify-content-center gap-2'>
                            <label className='cursor-pointer'>
                                <input
                                    type='checkbox'
                                    value='AM4'
                                    checked={cpuFilters.socketTypes.AM4}
                                    onChange={(e) => handleCpuSocketCheckbox(e.target.value, e.target.checked)}
                                    className='mr-3 cursor-pointer'
                                />
                                AM4
                            </label>
                        </div>
                        <div className='flex justify-content-center gap-2'>
                            <label className='cursor-pointer'>
                                <input
                                    type='checkbox'
                                    value='LGA1150'
                                    checked={cpuFilters.socketTypes.LGA1150}
                                    onChange={(e) => handleCpuSocketCheckbox(e.target.value, e.target.checked)}
                                    className='mr-3 cursor-pointer'
                                />
                                LGA1150
                            </label>
                        </div>
                        <div className='flex justify-content-center gap-2'>
                            <label className='cursor-pointer'>
                                <input
                                    type='checkbox'
                                    value='LGA1151'
                                    checked={cpuFilters.socketTypes.LGA1151}
                                    onChange={(e) => handleCpuSocketCheckbox(e.target.value, e.target.checked)}
                                    className='mr-3 cursor-pointer'
                                />
                                LGA1151
                            </label>
                        </div>
                        <div className='flex justify-content-center gap-2'>
                            <label className='cursor-pointer'>
                                <input
                                    type='checkbox'
                                    value='LGA1155'
                                    checked={cpuFilters.socketTypes.LGA1155}
                                    onChange={(e) => handleCpuSocketCheckbox(e.target.value, e.target.checked)}
                                    className='mr-3 cursor-pointer'
                                />
                                LGA1155
                            </label>
                        </div>
                        <div className='flex justify-content-center gap-2'>
                            <label className='cursor-pointer'>
                                <input
                                    type='checkbox'
                                    value='LGA1200'
                                    checked={cpuFilters.socketTypes.LGA1200}
                                    onChange={(e) => handleCpuSocketCheckbox(e.target.value, e.target.checked)}
                                    className='mr-3 cursor-pointer'
                                />
                                LGA1200
                            </label>
                        </div>
                        <div className='flex justify-content-center gap-2'>
                            <label className='cursor-pointer'>
                                <input
                                    type='checkbox'
                                    value='LGA1700'
                                    checked={cpuFilters.socketTypes.LGA1700}
                                    onChange={(e) => handleCpuSocketCheckbox(e.target.value, e.target.checked)}
                                    className='mr-3 cursor-pointer'
                                />
                                LGA1700
                            </label>
                        </div>
                        <div className='flex justify-content-center gap-2'>
                            <label className='cursor-pointer'>
                                <input
                                    type='checkbox'
                                    value='LGA2011'
                                    checked={cpuFilters.socketTypes.LGA2011}
                                    onChange={(e) => handleCpuSocketCheckbox(e.target.value, e.target.checked)}
                                    className='mr-3 cursor-pointer'
                                />
                                LGA2011
                            </label>
                        </div>
                        {/* <InputGroup className="mb-3 flex align-items-center gap-2">
                            <InputGroup.Checkbox />AMD
                        </InputGroup>
                        <InputGroup className="mb-3 flex align-items-center gap-2">
                            <InputGroup.Checkbox />Intel
                        </InputGroup> */}
                        {/*Rgb or No Rgb  */}
                        {/* ========================================================== */}
                        {/* <Button onClick={() => priceSort()}>Apply filters</Button> */}
                    </div>
                </Col>
                <Col md={9} className='px-2'>
                    {/* <PaginationExample /> */}
                    <div className="">

                        <SwitchComponent />

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
