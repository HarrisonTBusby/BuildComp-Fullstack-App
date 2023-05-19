import React, { useEffect, useState } from 'react';
import NavbarComponent from '../Navbar/Navbar';
import { Col, Dropdown, InputGroup, OverlayTrigger, Tooltip, Button, Card } from 'react-bootstrap';
import Footer from '../Footer/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useWindowSize } from '../../HelperFunctions';
import { GetPartData } from '../../Services/DataService';
import Paginate from "react-paginate";
import { useNavigate } from 'react-router-dom';
import CaseList from '../Lists/CaseList';
import CpuList from '../Lists/CpuList';
import GpuList from '../Lists/GpuList';
import MotherboardList from '../Lists/MotherboardList';
import HardDriveList from '../Lists/HardDriveList';
import HeatsinkList from '../Lists/HeatsinkList';
import PsList from '../Lists/PsList';
import RamList from '../Lists/RamList';
import { CpuData, GpuData, CaseData, HardDriveData, MotherboardData, HeatsinkData, PowerSupplyData, RamData } from '../../Interfaces/PartDataInterfaces';

interface ManufacturerFilters {
    manufacturers: {
        [key: string]: boolean;
    }
}

interface CpuFilters {
    manufacturers: {
        [key: string]: boolean
    },
    socketTypes: {
        [key: string]: boolean
    }
}

interface MotherboardFilters {
    manufacturers: {
        [key: string]: boolean
    }
    ramTypes: {
        [key: string]: boolean
    }
    socketTypes: {
        [key: string]: boolean
    }
}

export default function Parts() {
    const navigate = useNavigate();
    const size = useWindowSize();

    const [currentPage, setCurrentPage] = useState<number>(0);
    const [totalPages, setTotalPages] = useState(6);

    const [selectedComponent, setSelectedComponent] = useState<string>('');
    const [minBudget, setMinBudget] = useState<number>(0);
    const [maxBudget, setMaxBudget] = useState<number>(0);
    const [cpuData, setCpuData] = useState<CpuData[]>([]);
    const [originalCpuData, setOriginalCpuData] = useState<CpuData[]>([]);
    const [gpuData, setGpuData] = useState<GpuData[]>([]);
    const [originalGpuData, setOriginalGpuData] = useState<GpuData[]>([]);
    const [caseData, setCaseData] = useState<CaseData[]>([]);
    const [motherboardData, setMotherboardData] = useState<MotherboardData[]>([]);
    const [originalMotherboardData, setOriginalMotherboardData] = useState<MotherboardData[]>([]);
    const [ramData, setRamData] = useState<RamData[]>([]);
    const [psData, setPsData] = useState<PowerSupplyData[]>([]);
    const [heatsinkData, setHeatsinkData] = useState<HeatsinkData[]>([]);
    const [hardDriveData, setHardDriveData] = useState<HardDriveData[]>([]);

    const [componentType, setComponentType] = useState<string>('PC Components');

    const [cpuFilters, setCpuFilters] = useState<CpuFilters>({
        manufacturers: { All: true, AMD: false, Intel: false },
        socketTypes: { All: true, AM4: false, LGA1150: false, LGA1151: false, LGA1155: false, LGA1200: false, LGA1700: false, LGA2011: false }
    });

    const originalCpuFilters = {
        manufacturers: { All: true, AMD: false, Intel: false },
        socketTypes: { All: true, AM4: false, LGA1150: false, LGA1151: false, LGA1155: false, LGA1200: false, LGA1700: false, LGA2011: false }
    }

    const [gpuFilters, setGpuFilters] = useState<ManufacturerFilters>({
        manufacturers: { All: true, MSI: false, EVGA: false, Gigabyte: false, PowerColor: false, Asus: false, XFX: false, Zotac: false }
    })

    const originalGpuFilters = {
        manufacturers: { All: true, MSI: false, EVGA: false, Gigabyte: false, PowerColor: false, Asus: false, XFX: false, Zotac: false }
    }

    const [motherboardFilters, setMotherboardFilters] = useState<MotherboardFilters>({
        manufacturers: { All: true, ASRock: false, Asus: false, Gigabyte: false, MSI: false },
        ramTypes: { All: true, DDR3: false, DDR4: false, DDR5: false },
        socketTypes: { All: true, AM4: false, LGA1150: false, LGA1151: false, LGA1200: false, LGA1700: false }
    })

    const originalMotherboardFilters = {
        manufacturers: { All: true, ASRock: false, Asus: false, Gigabyte: false, MSI: false },
        ramTypes: { All: true, DDR3: false, DDR4: false, DDR5: false },
        socketTypes: { All: true, AM4: false, LGA1150: false, LGA1151: false, LGA1200: false, LGA1700: false }
    }

    // For Dropdown values
    async function handleComponentSelect(component: string) {
        if (component == selectedComponent) return
        const data = await GetPartData(component);
        if (component === 'CPU') {
            setCpuData(data);
            //setOriginalCpu(data) is not needed, already called on first useEffect
            setTotalPages(Math.ceil(data.length / 6))
            setComponentType('CPU')
            //set checkboxes with value 'All' to true 
            setCpuFilters(originalCpuFilters)
        } else if (component === 'GPU') {
            setGpuData(data);
            setOriginalGpuData(data)
            setTotalPages(Math.ceil(data.length / 6))
            setComponentType('GPU')
            //set checkboxes with value 'All' to true
            setGpuFilters(originalGpuFilters)
        } else if (component === "Motherboard") {
            setMotherboardData(data);
            setOriginalMotherboardData(data);
            setTotalPages(Math.ceil(data.length / 6))
            setComponentType('Motherboard')
            setMotherboardFilters(originalMotherboardFilters)
        } else if (component === "Case") {
            setCaseData(data)
            setTotalPages(Math.ceil(data.length / 6))
            setComponentType('Case')
        } else if (component === "Ram") {
            setRamData(data)
            setTotalPages(Math.ceil(data.length / 6))
            setComponentType('Ram')
        } else if (component === 'Ps') {
            setPsData(data)
            setTotalPages(Math.ceil(data.length / 6))
            setComponentType('Ps')
        } else if (component === "Heatsink") {
            setHeatsinkData(data)
            setTotalPages(Math.ceil(data.length / 6))
            setComponentType('Heatsink')
        } else if (component === "HardDrive") {
            setTotalPages(Math.ceil(data.length / 6))
            setHardDriveData(data)
            setComponentType('HardDrive')
        }
        setCurrentPage(0)
    }

    useEffect(() => {
        async function getData() {
            const data = await GetPartData('CPU');
            setOriginalCpuData(data);
            setCpuData(data);
            setTotalPages(Math.ceil(data.length / 6))
            setComponentType('CPU')

        }
        getData()

    }, [])

    useEffect(() => {
        if (currentPage !== totalPages) {
            setCurrentPage(0);
        }
    }, [totalPages]);

    //HandlesPaginationButtons
    const handlePageChange = (selectedPage: { selected: number }) => {
        setCurrentPage(selectedPage.selected);
    };

    const SwitchComponent = () => {
        switch (componentType) {
            case 'CPU':
                return <CpuList cpuData={cpuData} currentPage={currentPage} />;
            case 'GPU':
                return <GpuList gpuData={gpuData} currentPage={currentPage} />;
            case 'Motherboard':
                return <MotherboardList motherboardData={motherboardData} currentPage={currentPage} />;
            case 'Case':
                return <CaseList caseData={caseData} currentPage={currentPage} />;
            case 'Ram':
                return <RamList ramData={ramData} currentPage={currentPage} />;
            case 'Ps':
                return <PsList psData={psData} currentPage={currentPage} />;
            case 'Heatsink':
                return <HeatsinkList heatsinkData={heatsinkData} currentPage={currentPage} />;
            case 'HardDrive':
                return <HardDriveList hardDriveData={hardDriveData} currentPage={currentPage} />;
            default:
                return null;
        }
    }

    // For ToolTip on Dropdown
    const renderTooltip = (content: string) => {
        return <Tooltip id='button-tooltip'>{content}</Tooltip>;
    };

    // For Budget values
    // const handleMinBudget = (value: number) => {
    //     setMinBudget(value);
    // };

    // const handleMaxBudget = (value: number) => {
    //     setMaxBudget(value);
    // };

    const handleCpuFiltersCheckbox = () => {
        let filteredData = originalCpuData;

        if (!cpuFilters.manufacturers.All) {
            filteredData = filteredData.filter((cpu) => {
                const { manufacturers } = cpuFilters;
                return Object.keys(manufacturers).some(
                    (key) => cpu.title.includes(key) && manufacturers[key]
                );
            });
        }

        if (!cpuFilters.socketTypes.All) {
            filteredData = filteredData.filter((cpu) => {
                const { socketTypes } = cpuFilters;
                return Object.keys(socketTypes).some(
                    (key) => cpu.socketType.includes(key) && socketTypes[key]
                );
            });
        }

        setCpuData(filteredData);
        setTotalPages(Math.ceil(filteredData.length / 6));
    };

    const handleGpuFiltersCheckbox = () => {
        let filteredData = originalGpuData;

        if (!gpuFilters.manufacturers.All) {
            filteredData = filteredData.filter((gpu) => {
                const { manufacturers } = gpuFilters;
                return Object.keys(manufacturers).some(
                    (key) => gpu.title.includes(key) && manufacturers[key]
                );
            });
        }

        setGpuData(filteredData);
        setTotalPages(Math.ceil(filteredData.length / 6));
    }

    const handleMotherboardFiltersCheckbox = () => {
        let filteredData = originalMotherboardData;

        if (!motherboardFilters.manufacturers.All) {
            filteredData = filteredData.filter((motherboard) => {
                const { manufacturers } = motherboardFilters;
                return Object.keys(manufacturers).some(
                    (key) => motherboard.title.includes(key) && manufacturers[key]
                );
            });
        }

        if (!motherboardFilters.ramTypes.All) {
            filteredData = filteredData.filter((motherboard) => {
                const { ramTypes } = motherboardFilters;
                return Object.keys(ramTypes).some(
                    (key) => motherboard.ramType.includes(key) && ramTypes[key]
                );
            });
        }

        if (!motherboardFilters.socketTypes.All) {
            filteredData = filteredData.filter((motherboard) => {
                const { socketTypes } = motherboardFilters;
                return Object.keys(socketTypes).some(
                    (key) => motherboard.socketType.includes(key) && socketTypes[key]
                );
            });
        }

        setMotherboardData(filteredData);
        setTotalPages(Math.ceil(filteredData.length / 6));
    }

    useEffect(() => {
        handleCpuFiltersCheckbox()
    }, [cpuFilters])

    useEffect(() => {
        handleGpuFiltersCheckbox()
    }, [gpuFilters])

    useEffect(() => {
        handleMotherboardFiltersCheckbox()
    }, [motherboardFilters])

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
        if (componentType === 'CPU') {
            setCpuData(sortByPrice(cpuData));
        } else if (componentType === 'GPU') {
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
    }

    const cpuCoreSort = () => {
        const newArr = [...cpuData]
        newArr.sort((a: any, b: any) => {
            if (parseFloat(a.cores) < parseFloat(b.cores)) {
                return -1
            }
            if (parseFloat(a.cores) > parseFloat(b.cores)) {
                return 1;
            }
            return 0;
        })
        setCpuData(newArr)
    }

    const cpuClockSort = () => {
        const newArr = [...cpuData]
        newArr.sort((a: any, b: any) => {
            if (parseFloat(a.perfCoreClock) < parseFloat(b.perfCoreClock)) {
                return -1
            }
            if (parseFloat(a.perfCoreClock) > parseFloat(b.perfCoreClock)) {
                return 1;
            }
            return 0;
        })
        setCpuData(newArr)
    }

    const gpuMemorySort = () => {
        const newArr = [...gpuData]
        newArr.sort((a: any, b: any) => {
            if (parseInt(a.memory) < parseInt(b.memory)) {
                return -1
            }
            if (parseInt(a.memory) > parseInt(b.memory)) {
                return 1;
            }
            return 0;
        })
        setGpuData(newArr)
    }

    const gpuClockSort = () => {
        const newArr = [...gpuData]
        newArr.sort((a: any, b: any) => {
            if (parseInt(a.perfCoreClock) < parseInt(b.perfCoreClock)) {
                return -1
            }
            if (parseInt(a.perfCoreClock) > parseInt(b.perfCoreClock)) {
                return 0
            }
            return 0
        })
        setGpuData(newArr)
    }

    const motherboardRamSort = () => {
        const newArr = [...motherboardData]
        newArr.sort((a: any, b: any) => {
            if (parseInt(a.ramMax) < parseInt(b.ramMax)) {
                return -1
            }
            if (parseInt(a.ramMax) > parseInt(b.ramMax)) {
                return 0
            }
            return 0
        })
        setMotherboardData(newArr)
    }

    const motherboardMemorySlotsSort = () => {
        const newArr = [...motherboardData]
        newArr.sort((a: any, b: any) => {
            if (parseInt(a.memorySlots) < parseInt(b.memorySlots)) {
                return -1
            }
            if (parseInt(a.memorySlots) > parseInt(b.memorySlots)) {
                return 0
            }
            return 0
        })
        setMotherboardData(newArr)
    }

    const isAllCpuSocketUnchecked = Object.values(cpuFilters.socketTypes).every(value => value === false);
    if (isAllCpuSocketUnchecked) {
        setCpuFilters((prev) => ({
            ...prev,
            socketTypes: { ...prev.socketTypes, All: true }
        }))
    }

    const isAllCpuManufacturerUnchecked = Object.values(cpuFilters.manufacturers).every(value => value === false);
    if (isAllCpuManufacturerUnchecked) {
        setCpuFilters((prev) => ({
            ...prev,
            manufacturers: { ...prev.manufacturers, All: true }
        }))
    }

    const isAllGpuManufacturerUnchecked = Object.values(gpuFilters.manufacturers).every(value => value === false);
    if (isAllGpuManufacturerUnchecked) {
        setGpuFilters((prev) => ({
            ...prev,
            manufacturers: { ...prev.manufacturers, All: true }
        }))
    }

    const isAllMotherboardManufacturerUnchecked = Object.values(motherboardFilters.manufacturers).every(value => value === false);
    if (isAllMotherboardManufacturerUnchecked) {
        setMotherboardFilters((prev) => ({
            ...prev,
            manufacturers: { ...prev.manufacturers, All: true }
        }))
    }

    const isAllMotherboardRamUnchecked = Object.values(motherboardFilters.ramTypes).every(value => value === false);
    if (isAllMotherboardRamUnchecked) {
        setMotherboardFilters((prev) => ({
            ...prev,
            ramTypes: { ...prev.ramTypes, All: true }
        }))
    }

    const isAllMotherboardSocketUnchecked = Object.values(motherboardFilters.socketTypes).every(value => value === false);
    if (isAllMotherboardSocketUnchecked) {
        setMotherboardFilters((prev) => ({
            ...prev,
            socketTypes: { ...prev.socketTypes, All: true }
        }))
    }

    const handleCpuManufacturerCheckbox = (value: string, checked: boolean) => {
        if (value === 'All') {
            setCpuFilters((prev) => ({
                ...prev,
                manufacturers: { All: true, AMD: false, Intel: false }
            }))
        } else if (value !== 'All') {
            setCpuFilters((prev) => ({
                ...prev,
                manufacturers: {
                    ...prev.manufacturers,
                    All: false,
                    [value]: checked
                }
            }));
        }
    }

    const handleCpuSocketCheckbox = (value: string, checked: boolean) => {
        if (value === 'All') {
            setCpuFilters((prev) => ({
                ...prev,
                socketTypes: { All: true, AM4: false, LGA1150: false, LGA1151: false, LGA1155: false, LGA1200: false, LGA1700: false, LGA2011: false }
            }))
        } else if (value !== 'All') {
            setCpuFilters((prev) => ({
                ...prev,
                socketTypes: {
                    ...prev.socketTypes,
                    All: false,
                    [value]: checked
                }
            }));
        }
    };

    const handleGpuManufacturerCheckbox = (value: string, checked: boolean) => {
        if (value === 'All') {
            setGpuFilters(originalGpuFilters);
        } else if (value !== 'All') {
            setGpuFilters((prev) => ({
                ...prev,
                manufacturers: {
                    ...prev.manufacturers,
                    All: false,
                    [value]: checked
                }
            }));
        }
    };

    const handleMotherboardManufacturerCheckbox = (value: string, checked: boolean) => {
        if (value === 'All') {
            setMotherboardFilters((prev) => ({
                ...prev,
                manufacturers: { All: true, ASRock: false, Asus: false, Gigabyte: false, MSI: false }
            }))
            setTotalPages(Math.ceil(originalMotherboardData.length / 6));
        } else if (value !== 'All') {
            setMotherboardFilters((prev) => ({
                ...prev,
                manufacturers: {
                    ...prev.manufacturers,
                    All: false,
                    [value]: checked
                }
            }));
        }
    }
    const handleMotherboardRamCheckbox = (value: string, checked: boolean) => {
        if (value === 'All') {
            setMotherboardFilters((prev) => ({
                ...prev,
                ramTypes: { All: true, DDR3: false, DDR4: false, DDR5: false }
            }))
            setTotalPages(Math.ceil(originalMotherboardData.length / 6));
        } else if (value !== 'All') {
            setMotherboardFilters((prev) => ({
                ...prev,
                ramTypes: {
                    ...prev.ramTypes,
                    All: false,
                    [value]: checked
                }
            }));
        }
    }

    const handleMotherboardSocketCheckbox = (value: string, checked: boolean) => {
        if (value === 'All') {
            setMotherboardFilters((prev) => ({
                ...prev,
                socketTypes: { All: true, AM4: false, LGA1150: false, LGA1151: false, LGA1200: false, LGA1700: false }
            }))
            setTotalPages(Math.ceil(originalMotherboardData.length / 6));
        } else if (value !== 'All') {
            setMotherboardFilters((prev) => ({
                ...prev,
                socketTypes: {
                    ...prev.socketTypes,
                    All: false,
                    [value]: checked
                }
            }));
        }
    }

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
                                        <p className='mt-5'>Components</p>
                                        <Dropdown className='bb-dropdown'>
                                            <Dropdown.Toggle className='dropdownSize'>
                                                {componentType}
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu >
                                                <OverlayTrigger placement="right" overlay={renderTooltip('Provides the instructions and processing power the computer needs to do its work. The more powerful and updated your processor, the faster your computer can complete its tasks.')}>
                                                    <Dropdown.Item onClick={() => handleComponentSelect('CPU')} className='ddButton'>CPU</Dropdown.Item>
                                                </OverlayTrigger>
                                                <OverlayTrigger placement="right" overlay={renderTooltip('Helps handle graphics-related work like graphics, effects, and videos')}>
                                                    <Dropdown.Item onClick={() => handleComponentSelect('GPU')} className='ddButton'>GPU</Dropdown.Item>
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
                                    <Button className='mb-2 w-100' onClick={() => priceSort()}>SORT BY PRICE</Button>
                                    <Button className={componentType !== 'CPU' ? 'd-none' : 'mb-2 w-100'} onClick={() => cpuCoreSort()}>SORT BY CORES</Button>
                                    <Button className={componentType !== 'CPU' ? 'd-none' : 'mb-2 w-100'} onClick={() => cpuClockSort()}>SORT BY CLOCK</Button>
                                    <Button className={componentType !== 'GPU' ? 'd-none' : 'mb-2 w-100'} onClick={() => gpuMemorySort()}>SORT BY MEMORY</Button>
                                    <Button className={componentType !== 'GPU' ? 'd-none' : 'mb-2 w-100'} onClick={() => gpuClockSort()}>SORT BY CLOCK</Button>
                                    <Button className={componentType !== 'Motherboard' ? 'd-none' : 'mb-2 w-100'} onClick={() => motherboardRamSort()}>SORT BY MAX RAM</Button>
                                    <Button className={componentType !== 'Motherboard' ? 'd-none' : 'mb-2 w-100'} onClick={() => motherboardMemorySlotsSort()}>SORT BY MEMORY SLOTS</Button>

                                    <hr />
                                    <p className='mt-4'>Filter</p>
                                    <button onClick={() => handleComponentSelect(componentType)} className='clearFiltersBtn'>Clear Filters</button>
                                    {/* <hr />
                                    <p>Budget</p>
                                    <input className='w-75' type='number' placeholder='Min' value={minBudget} onChange={(e) => setMinBudget(parseInt(e.target.value))}></input>
                                    <input className='w-75' type='number' placeholder='Max' value={maxBudget} onChange={(e) => setMaxBudget(parseInt(e.target.value))}></input> */}
                                    {/* <button onClick={() => filterByPriceRange(minBudget, maxBudget)} className='clearFiltersBtn'>Results</button> */}
                                    <hr />
                                    <div className={componentType !== 'CPU' ? 'd-none' : ''}>
                                        <p>Manufacturer</p>
                                        {/* Renders CPU manufacturer checkboxes */}
                                        {Object.keys(cpuFilters.manufacturers).map((key) => (
                                            <div key={key} className='flex justify-content-center gap-2'>
                                                <label className='cursor-pointer'>
                                                    <input
                                                        type='checkbox'
                                                        value={key}
                                                        checked={cpuFilters.manufacturers[key]}
                                                        onChange={(e) => handleCpuManufacturerCheckbox(e.target.value, e.target.checked)}
                                                        className='mr-3 cursor-pointer'
                                                    />
                                                    {key}
                                                </label>
                                            </div>
                                        ))}
                                        <hr></hr>
                                        <p>Socket Type</p>
                                        {/* Renders CPU socket type checkboxes */}
                                        {Object.keys(cpuFilters.socketTypes).map((key) => (
                                            <div key={key} className='flex justify-content-center gap-2'>
                                                <label className='cursor-pointer'>
                                                    <input
                                                        type='checkbox'
                                                        value={key}
                                                        checked={cpuFilters.socketTypes[key]}
                                                        onChange={(e) => handleCpuSocketCheckbox(e.target.value, e.target.checked)}
                                                        className='mr-3 cursor-pointer'
                                                    />
                                                    {key}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                    <div className={componentType !== 'GPU' ? 'd-none' : ''}>
                                        <p>Manufacturer</p>
                                        {/* renders GPU manufacturer checkboxes */}
                                        {Object.keys(gpuFilters.manufacturers).map((key) => (
                                            <div key={key} className='flex justify-content-center gap-2'>
                                                <label className='cursor-pointer'>
                                                    <input
                                                        type='checkbox'
                                                        value={key}
                                                        checked={gpuFilters.manufacturers[key]}
                                                        onChange={(e) => handleGpuManufacturerCheckbox(e.target.value, e.target.checked)}
                                                        className='mr-3 cursor-pointer'
                                                    />
                                                    {key}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                    <div className={componentType !== 'Motherboard' ? 'd-none' : ''}>
                                        <p>Manufacturer</p>
                                        {Object.keys(motherboardFilters.manufacturers).map((key) => (
                                            <div key={key} className='flex justify-content-center gap-2'>
                                                <label className='cursor-pointer'>
                                                    <input
                                                        type='checkbox'
                                                        value={key}
                                                        checked={motherboardFilters.manufacturers[key]}
                                                        onChange={(e) => handleMotherboardManufacturerCheckbox(e.target.value, e.target.checked)}
                                                        className='mr-3 cursor-pointer'
                                                    />
                                                    {key}
                                                </label>
                                            </div>
                                        ))}
                                        <hr />
                                        <p>Ram</p>
                                        {Object.keys(motherboardFilters.ramTypes).map((key) => (
                                            <div key={key} className='flex justify-content-center gap-2'>
                                                <label className='cursor-pointer'>
                                                    <input
                                                        type='checkbox'
                                                        value={key}
                                                        checked={motherboardFilters.ramTypes[key]}
                                                        onChange={(e) => handleMotherboardRamCheckbox(e.target.value, e.target.checked)}
                                                        className='mr-3 cursor-pointer'
                                                    />
                                                    {key}
                                                </label>
                                            </div>
                                        ))}
                                        <p>Socket</p>
                                        {Object.keys(motherboardFilters.socketTypes).map((key) => (
                                            <div key={key} className='flex justify-content-center gap-2'>
                                                <label className='cursor-pointer'>
                                                    <input
                                                        type='checkbox'
                                                        value={key}
                                                        checked={motherboardFilters.socketTypes[key]}
                                                        onChange={(e) => handleMotherboardSocketCheckbox(e.target.value, e.target.checked)}
                                                        className='mr-3 cursor-pointer'
                                                    />
                                                    {key}
                                                </label>
                                            </div>
                                        ))}
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
                                    {componentType}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <OverlayTrigger placement="right" overlay={renderTooltip('Provides the instructions and processing power the computer needs to do its work. The more powerful and updated your processor, the faster your computer can complete its tasks.')}>
                                        <Dropdown.Item onClick={() => handleComponentSelect('CPU')} className='ddButton'>CPU</Dropdown.Item>
                                    </OverlayTrigger>
                                    <OverlayTrigger placement="right" overlay={renderTooltip('Helps handle graphics-related work like graphics, effects, and videos')}>
                                        <Dropdown.Item onClick={() => handleComponentSelect('GPU')} className='ddButton'>GPU</Dropdown.Item>
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
                    </div>
                    <Button className='mb-2' onClick={() => priceSort()}>SORT BY PRICE</Button>
                    <Button className={componentType !== 'CPU' ? 'd-none' : 'mb-2'} onClick={() => cpuCoreSort()}>SORT BY CORES</Button>
                    <Button className={componentType !== 'CPU' ? 'd-none' : 'mb-2'} onClick={() => cpuClockSort()}>SORT BY CLOCK</Button>
                    <Button className={componentType !== 'GPU' ? 'd-none' : 'mb-2'} onClick={() => gpuMemorySort()}>SORT BY MEMORY</Button>
                    <Button className={componentType !== 'GPU' ? 'd-none' : 'mb-2'} onClick={() => gpuClockSort()}>SORT BY CLOCK</Button>
                    <Button className={componentType !== 'Motherboard' ? 'd-none' : 'mb-2'} onClick={() => motherboardRamSort()}>SORT BY MAX RAM</Button>
                    <Button className={componentType !== 'Motherboard' ? 'd-none' : 'mb-2'} onClick={() => motherboardMemorySlotsSort()}>SORT BY MEMORY SLOTS</Button>

                    <hr />
                    <p className='mt-4'>Filter</p>
                    <button onClick={() => handleComponentSelect(componentType)} className='clearFiltersBtn'>Clear Filters</button>
                    {/* <hr />
                    <p>Budget</p>
                    <input className='w-75' type='number' placeholder='Min' value={minBudget} onChange={(e) => setMinBudget(parseInt(e.target.value))}></input>
                    <input className='w-75' type='number' placeholder='Max' value={maxBudget} onChange={(e) => setMaxBudget(parseInt(e.target.value))}></input> */}
                    {/* <button onClick={() => filterByPriceRange(minBudget, maxBudget)} className='clearFiltersBtn'>Results</button> */}
                    <hr />
                    <div className={componentType !== 'CPU' ? 'd-none' : ''}>
                        <p>Manufacturer</p>
                        {/* Renders CPU manufacturer checkboxes */}
                        {Object.keys(cpuFilters.manufacturers).map((key) => (
                            <div key={key} className='flex justify-content-center gap-2'>
                                <label className='cursor-pointer'>
                                    <input
                                        type='checkbox'
                                        value={key}
                                        checked={cpuFilters.manufacturers[key]}
                                        onChange={(e) => handleCpuManufacturerCheckbox(e.target.value, e.target.checked)}
                                        className='mr-3 cursor-pointer'
                                    />
                                    {key}
                                </label>
                            </div>
                        ))}
                        <hr></hr>
                        <p>Socket Type</p>
                        {/* Renders CPU socket type checkboxes */}
                        {Object.keys(cpuFilters.socketTypes).map((key) => (
                            <div key={key} className='flex justify-content-center gap-2'>
                                <label className='cursor-pointer'>
                                    <input
                                        type='checkbox'
                                        value={key}
                                        checked={cpuFilters.socketTypes[key]}
                                        onChange={(e) => handleCpuSocketCheckbox(e.target.value, e.target.checked)}
                                        className='mr-3 cursor-pointer'
                                    />
                                    {key}
                                </label>
                            </div>
                        ))}
                    </div>
                    <div className={componentType !== 'GPU' ? 'd-none' : ''}>
                        <p>Manufacturer</p>
                        {/* renders GPU manufacturer checkboxes */}
                        {Object.keys(gpuFilters.manufacturers).map((key) => (
                            <div key={key} className='flex justify-content-center gap-2'>
                                <label className='cursor-pointer'>
                                    <input
                                        type='checkbox'
                                        value={key}
                                        checked={gpuFilters.manufacturers[key]}
                                        onChange={(e) => handleGpuManufacturerCheckbox(e.target.value, e.target.checked)}
                                        className='mr-3 cursor-pointer'
                                    />
                                    {key}
                                </label>
                            </div>
                        ))}
                    </div>
                    <div className={componentType !== 'Motherboard' ? 'd-none' : ''}>
                        <p>Manufacturer</p>
                        {Object.keys(motherboardFilters.manufacturers).map((key) => (
                            <div key={key} className='flex justify-content-center gap-2'>
                                <label className='cursor-pointer'>
                                    <input
                                        type='checkbox'
                                        value={key}
                                        checked={motherboardFilters.manufacturers[key]}
                                        onChange={(e) => handleMotherboardManufacturerCheckbox(e.target.value, e.target.checked)}
                                        className='mr-3 cursor-pointer'
                                    />
                                    {key}
                                </label>
                            </div>
                        ))}
                        <hr />
                        <p>Ram</p>
                        {Object.keys(motherboardFilters.ramTypes).map((key) => (
                            <div key={key} className='flex justify-content-center gap-2'>
                                <label className='cursor-pointer'>
                                    <input
                                        type='checkbox'
                                        value={key}
                                        checked={motherboardFilters.ramTypes[key]}
                                        onChange={(e) => handleMotherboardRamCheckbox(e.target.value, e.target.checked)}
                                        className='mr-3 cursor-pointer'
                                    />
                                    {key}
                                </label>
                            </div>
                        ))}
                        <p>Socket</p>
                        {Object.keys(motherboardFilters.socketTypes).map((key) => (
                            <div key={key} className='flex justify-content-center gap-2'>
                                <label className='cursor-pointer'>
                                    <input
                                        type='checkbox'
                                        value={key}
                                        checked={motherboardFilters.socketTypes[key]}
                                        onChange={(e) => handleMotherboardSocketCheckbox(e.target.value, e.target.checked)}
                                        className='mr-3 cursor-pointer'
                                    />
                                    {key}
                                </label>
                            </div>
                        ))}
                    </div>
                </Col>
                <Col md={9} className='px-2'>
                    <div className="">
                        <SwitchComponent />
                        <div className="d-flex justify-content-center mt-4">
                            <Paginate
                                key={currentPage}
                                previousLabel={"<"}
                                nextLabel={">"}
                                pageCount={totalPages}
                                onPageChange={handlePageChange}
                                containerClassName={"pagination"}
                                activeClassName={"active-page"}
                                forcePage={currentPage}
                            />
                        </div>
                    </div>
                </Col>
            </div>
            <Footer />
        </div>
    )
};
