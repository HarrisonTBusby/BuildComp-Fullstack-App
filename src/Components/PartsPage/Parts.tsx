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
import Slider from '@mui/material/Slider';

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

interface CaseFilters {
    manufacturers: {
        [key: string]: boolean
    }
    sizes: {
        [key: string]: boolean
    }
    colors: {
        [key: string]: boolean
    }
}

interface RamFiters {
    manufacturers: {
        [key: string]: boolean
    }
    ramTypes: {
        [key: string]: boolean
    }
    moduleAmounts: {
        [key: string]: boolean
    }
}

interface PowerSupplyFilters {
    manufacturers: {
        [key: string]: boolean
    }
    wattages: {
        [key: string]: boolean
    }
}

interface HeatsinkFilters {
    manufacturers: {
        [key: string]: boolean
    }
    cooling: {
        [key: string]: boolean
    }
}

interface HardDriveFilters {
    manufacturers: {
        [key: string]: boolean
    }
    storages: {
        [key: string]: boolean
    }
    pcies: {
        [key: string]: boolean
    }
}

export default function Parts() {

    const [fixedPrice, setFixedPrice] = useState(0)

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
    const [originalCaseData, setOriginalCaseData] = useState<CaseData[]>([]);
    const [motherboardData, setMotherboardData] = useState<MotherboardData[]>([]);
    const [originalMotherboardData, setOriginalMotherboardData] = useState<MotherboardData[]>([]);
    const [ramData, setRamData] = useState<RamData[]>([]);
    const [originalRamData, setOriginalRamData] = useState<RamData[]>([]);
    const [psData, setPsData] = useState<PowerSupplyData[]>([]);
    const [originalPsData, setOriginalPsData] = useState<PowerSupplyData[]>([]);
    const [heatsinkData, setHeatsinkData] = useState<HeatsinkData[]>([]);
    const [originalHeatsinkData, setOriginalHeatsinkData] = useState<HeatsinkData[]>([]);
    const [hardDriveData, setHardDriveData] = useState<HardDriveData[]>([]);
    const [originalHardDriveData, setOriginalHardDriveData] = useState<HardDriveData[]>([]);

    const [componentType, setComponentType] = useState<string>('PC Components');

    const [maxPrice, setMaxPrice] = React.useState<number[]>([0, 100]);
    const minDistance = 50;

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

    const [caseFilters, setCaseFilters] = useState<CaseFilters>({
        manufacturers: { All: true, 'be quiet!': false, 'Cooler Master': false, Corsair: false, 'Fractal Design': false, HYTE: false, 'Lian Li': false, NZXT: false, Phanteks: false, Zalman: false },
        sizes: { All: true, 'Mini ITX Desktop': false, 'ATX Mid Tower': false, 'ATX Full Tower': false, 'ATX Tower': false, 'ATX Desktop': false },
        colors: { All: true, White: false, Black: false, 'White/Black': false, 'White/Gray': false, 'Gray/Black': false }
    })

    const originalCaseFilters = {
        manufacturers: { All: true, 'be quiet!': false, 'Cooler Master': false, Corsair: false, 'Fractal Design': false, HYTE: false, 'Lian Li': false, NZXT: false, Phanteks: false, Zalman: false },
        sizes: { All: true, 'Mini ITX Desktop': false, 'ATX Mid Tower': false, 'ATX Full Tower': false, 'ATX Tower': false, 'ATX Desktop': false },
        colors: { All: true, White: false, Black: false, 'White/Black': false, 'White/Gray': false, 'Gray/Black': false }
    }

    const [ramFilters, setRamFilters] = useState<RamFiters>({
        manufacturers: { All: false, Crucial: false, 'G.Skill': false, TEAMGROUP: false },
        ramTypes: { All: true, DDR3: false, DDR4: false, DDR5: false },
        moduleAmounts: { All: true, '2 x 4GB': false, '2 x 8GB': false, '2 x 16GB': false, '2 x 32GB': false }
    })

    const originalRamFilters = {
        manufacturers: { All: true, Crucial: false, 'G.Skill': false, TEAMGROUP: false },
        ramTypes: { All: true, DDR3: false, DDR4: false, DDR5: false },
        moduleAmounts: { All: true, '2 x 4GB': false, '2 x 8GB': false, '2 x 16GB': false, '2 x 32GB': false }
    }

    const [psFilters, setPsFilters] = useState<PowerSupplyFilters>({
        manufacturers: { All: true, Asus: false, Corsair: false, EVGA: false, MSI: false, SeaSonic: false, Silverstone: false, 'Super Flower': false, Thermaltake: false },
        wattages: { All: true, 550: false, 600: false, 650: false, 750: false, 760: false, 850: false, 1000: false, 1200: false, 1300: false, 1500: false, 1600: false, 1650: false, 2050: false }
    })

    const originalPsFilters = {
        manufacturers: { All: true, Asus: false, Corsair: false, EVGA: false, MSI: false, SeaSonic: false, Silverstone: false, 'Super Flower': false, Thermaltake: false },
        wattages: { All: true, '550': false, '600': false, '650': false, '750': false, '760': false, '850': false, '1000': false, '1200': false, '1300': false, '1500': false, '1600': false, '1650': false, '2050': false }
    }

    const [heatsinkFilters, setHeatsinkFilters] = useState<HeatsinkFilters>({
        manufacturers: { All: true, ARCTIC: false, 'be quiet!': false, 'Cooler Master': false, Corsair: false, CRYORIG: false, Deepcool: false, EK: false, Noctua: false, NZXT: false, Scythe: false },
        cooling: { All: true, AirCooled: false, WaterCooled: false }
    })

    const originalHeatsinkFilters = {
        manufacturers: { All: true, ARCTIC: false, 'be quiet!': false, 'Cooler Master': false, Corsair: false, CRYORIG: false, Deepcool: false, EK: false, Noctua: false, NZXT: false, Scythe: false },
        cooling: { All: true, 'Air Cooled': false, 'Water Cooled': false }
    }

    const [hardDriveFilters, setHardDriveFilters] = useState<HardDriveFilters>({
        manufacturers: { All: true, Crucial: false, Sabrent: false, Samsung: false, SanDisk: false, 'SK hynix': false, 'Western Digital': false },
        storages: { All: true, '250 GB': false, '256 GB': false, '480 GB': false, '500 GB': false, '512 GB': false, '1 TB': false, '2 TB': false },
        pcies: { All: true, 'SATA 6.0 Gb/s': false, 'M.2 SATA': false, 'M.2 PCIe 3.0 X4': false, 'M.2 PCIe 4.0 X4': false }
    })

    const originalHardDriveFilters = {
        manufacturers: { All: true, Crucial: false, Sabrent: false, Samsung: false, SanDisk: false, 'SK hynix': false, 'Western Digital': false },
        storages: { All: true, '250 GB': false, '256 GB': false, '480 GB': false, '500 GB': false, '512 GB': false, '1 TB': false, '2 TB': false },
        pcies: { All: true, 'SATA 6.0 Gb/s': false, 'M.2 SATA': false, 'M.2 PCIe 3.0 X4': false, 'M.2 PCIe 4.0 X4': false }
    }

    const calculateMaxPrice = (arr: any) => {
        const prices = arr.map((obj: any) => parseFloat(obj.price));
        const highestPrice = Math.ceil(Math.max(...prices.filter((price: number) => !isNaN(price))));
        setMaxPrice([maxPrice[0], highestPrice]);
        setFixedPrice(highestPrice)
      }
      

    // const uniqueChipsets: any[] = [];
    // for (const obj of hardDriveData) {
    //     const chipset = obj.storageCapacity;
    //     if (!uniqueChipsets.includes(chipset)) {
    //         uniqueChipsets.push(chipset);
    //     }
    // }

    // uniqueChipsets.sort();
    // console.log(uniqueChipsets);

    // For Dropdown values
    async function handleComponentSelect(component: string) {
        if (component == selectedComponent) return
        const data = await GetPartData(component);
        calculateMaxPrice(data)
        if (component === 'CPU') {
            setCpuData(data);
            //setOriginalCpu(data) is not needed, already called on first useEffect
            setTotalPages(Math.ceil(data.length / 6))
            setComponentType('CPU')
            //set checkboxes with value 'All' to true 
            setCpuFilters(originalCpuFilters)
            console.log(maxPrice)
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
            setOriginalCaseData(data)
            setTotalPages(Math.ceil(data.length / 6))
            setComponentType('Case')
            setCaseFilters(originalCaseFilters)
        } else if (component === "Ram") {
            setRamData(data)
            setOriginalRamData(data)
            setTotalPages(Math.ceil(data.length / 6))
            setComponentType('Ram')
            setRamFilters(originalRamFilters)
        } else if (component === 'Ps') {
            setPsData(data)
            setOriginalPsData(data)
            setTotalPages(Math.ceil(data.length / 6))
            setComponentType('Ps')
            setPsFilters(originalPsFilters)
        } else if (component === "Heatsink") {
            setHeatsinkData(data)
            setOriginalHeatsinkData(data)
            setTotalPages(Math.ceil(data.length / 6))
            setComponentType('Heatsink')
            setHeatsinkFilters(originalHeatsinkFilters)
        } else if (component === "HardDrive") {
            setHardDriveData(data)
            setOriginalHardDriveData(data)
            setTotalPages(Math.ceil(data.length / 6))
            setComponentType('HardDrive')
            setHardDriveFilters(originalHardDriveFilters)
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
            calculateMaxPrice(data)
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

        filteredData = filterByPriceRange(filteredData, maxPrice)

        //setCpuData(filteredData)
        //setTotalPages(Math.ceil(cpuData.length / 6))

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

    const handleCaseFiltersCheckbox = () => {
        let filteredData = originalCaseData;
        if (!caseFilters.manufacturers.All) {
            filteredData = filteredData.filter((caseObj) => {
                const { manufacturers } = caseFilters;
                return Object.keys(manufacturers).some(
                    (key) => caseObj.title.includes(key) && manufacturers[key]
                );
            })
        }
        if (!caseFilters.sizes.All) {
            filteredData = filteredData.filter((caseObj) => {
                const { sizes } = caseFilters;
                return Object.keys(sizes).some(
                    (key) => caseObj.size.includes(key) && sizes[key]
                );
            })
        }
        if (!caseFilters.colors.All) {
            filteredData = filteredData.filter((caseObj) => {
                const { colors } = caseFilters;
                return Object.keys(colors).some(
                    (key) => caseObj.caseColor.includes(key) && colors[key]
                );
            })
        }

        setCaseData(filteredData)
        setTotalPages(Math.ceil(filteredData.length / 6))
    }

    const handleRamFiltersCheckbox = () => {
        let filteredData = originalRamData;

        if (!ramFilters.manufacturers.All) {
            filteredData = filteredData.filter((ram) => {
                const { manufacturers } = ramFilters;
                return Object.keys(manufacturers).some(
                    (key) => ram.title.includes(key) && manufacturers[key]
                );
            })
        }
        if (!ramFilters.ramTypes.All) {
            filteredData = filteredData.filter((ram) => {
                const { ramTypes } = ramFilters;
                return Object.keys(ramTypes).some(
                    (key) => ram.ramType.includes(key) && ramTypes[key]
                );
            })
        }
        if (!ramFilters.moduleAmounts.All) {
            filteredData = filteredData.filter((ram) => {
                const { moduleAmounts } = ramFilters;
                return Object.keys(moduleAmounts).some(
                    (key) => ram.moduleAmount.includes(key) && moduleAmounts[key]
                );
            })
        }

        setRamData(filteredData)
        setTotalPages(Math.ceil(filteredData.length / 6))
    }

    const handlePsFiltersCheckbox = () => {
        let filteredData = originalPsData;

        if (!psFilters.manufacturers.All) {
            filteredData = filteredData.filter((ps) => {
                const { manufacturers } = psFilters;
                return Object.keys(manufacturers).some(
                    (key) => ps.title.includes(key) && manufacturers[key]
                );
            })
        }
        if (!psFilters.wattages.All) {
            filteredData = filteredData.filter((ps) => {
                const { wattages } = psFilters;
                return Object.keys(wattages).some(
                    (key) => String(ps.wattage).includes(key) && wattages[key]
                );
            })
        }

        setPsData(filteredData)
        setTotalPages(Math.ceil(filteredData.length / 6))
    }

    const handleHeatsinkFiltersCheckbox = () => {
        let filteredData = originalHeatsinkData;

        if (!heatsinkFilters.manufacturers.All) {
            filteredData = filteredData.filter((heatsink) => {
                const { manufacturers } = heatsinkFilters;
                return Object.keys(manufacturers).some(
                    (key) => heatsink.title.includes(key) && manufacturers[key]
                );
            })
        }

        if (!heatsinkFilters.cooling.All) {
            if (!heatsinkFilters.cooling['Air Cooled']) {
                filteredData = filteredData.filter((heatsink) => {
                    return heatsink.isWaterCooled === true
                })
            }
            if (!heatsinkFilters.cooling['Water Cooled']) {
                filteredData = filteredData.filter((heatsink) => {
                    return heatsink.isWaterCooled === false
                })
            }

        }
        setHeatsinkData(filteredData)
        setTotalPages(Math.ceil(filteredData.length / 6))
    }

    const handleHardDriveFiltersCheckbox = () => {
        let filteredData = originalHardDriveData;

        if (!hardDriveFilters.manufacturers.All) {
            filteredData = filteredData.filter((hardDrive) => {
                const { manufacturers } = hardDriveFilters;
                return Object.keys(manufacturers).some(
                    (key) => hardDrive.title.includes(key) && manufacturers[key]
                );
            })
        }

        if (!hardDriveFilters.storages.All) {
            filteredData = filteredData.filter((hardDrive) => {
                const { storages } = hardDriveFilters;
                return Object.keys(storages).some(
                    (key) => String(hardDrive.storageCapacity).includes(key) && storages[key]
                );
            })
        }

        if (!hardDriveFilters.pcies.All) {
            filteredData = filteredData.filter((hardDrive) => {
                const { pcies } = hardDriveFilters;
                return Object.keys(pcies).some(
                    (key) => String(hardDrive.pcIeType).includes(key) && pcies[key]
                );
            })
        }

        setHardDriveData(filteredData)
        setTotalPages(Math.ceil(filteredData.length / 6))
    }

    // useEffect(() => {
    //     if (componentType === 'CPU') {
    //         setCpuData(filterByPriceRange(originalCpuData, maxPrice))
    //         setTotalPages(Math.ceil(cpuData.length / 6))
    //     } else if (componentType === 'GPU') {
    //         setGpuData(filterByPriceRange(gpuData, maxPrice))
    //         setTotalPages(Math.ceil(originalGpuData.length / 6))
    //     } else if (componentType === "Motherboard") {
    //         setMotherboardData(filterByPriceRange(motherboardData, maxPrice))
    //         setTotalPages(Math.ceil(originalMotherboardData.length / 6))
    //     } else if (componentType === "Case") {
    //         setCaseData(filterByPriceRange(caseData, maxPrice))
    //         setTotalPages(Math.ceil(originalCaseData.length / 6))
    //     } else if (componentType === "Ram") {
    //         setRamData(filterByPriceRange(ramData, maxPrice))
    //         setTotalPages(Math.ceil(originalRamData.length / 6))
    //     } else if (componentType === "Ps") {
    //         setPsData(filterByPriceRange(psData, maxPrice))
    //         setTotalPages(Math.ceil(originalPsData.length / 6))
    //     } else if (componentType === "Heatsink") {
    //         setHeatsinkData(filterByPriceRange(heatsinkData, maxPrice))
    //         setTotalPages(Math.ceil(originalHeatsinkData.length / 6))
    //     } else {
    //         setHardDriveData(filterByPriceRange(hardDriveData, maxPrice))
    //         setTotalPages(Math.ceil(originalHardDriveData.length / 6))
    //     }
    // }, [maxPrice])

    useEffect(() => {
        handleCpuFiltersCheckbox()
    }, [cpuFilters, maxPrice])

    useEffect(() => {
        handleGpuFiltersCheckbox()
    }, [gpuFilters])

    useEffect(() => {
        handleMotherboardFiltersCheckbox()
    }, [motherboardFilters])

    useEffect(() => {
        handleCaseFiltersCheckbox()
    }, [caseFilters])

    useEffect(() => {
        handleRamFiltersCheckbox()
    }, [ramFilters])

    useEffect(() => {
        handlePsFiltersCheckbox()
    }, [psFilters])

    useEffect(() => {
        handleHeatsinkFiltersCheckbox()
    }, [heatsinkFilters])

    useEffect(() => {
        handleHardDriveFiltersCheckbox()
    }, [hardDriveFilters])

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
                return 1
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
                return 1
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
                return 1
            }
            return 0
        })
        setMotherboardData(newArr)
    }

    const ramLatencySort = () => {
        const newArr = [...ramData]
        newArr.sort((a, b) => {
            if (a.firstWordLatency < b.firstWordLatency) {
                return -1
            }
            if (a.firstWordLatency > b.firstWordLatency) {
                return 1
            }
            return 0
        })
        setRamData(newArr)
    }

    const ramSpeedSort = () => {
        const newArr = [...ramData]
        newArr.sort((a, b) => {
            if (parseInt(a.ramSpeed) < parseInt(b.ramSpeed)) {
                return -1
            }
            if (parseInt(a.ramSpeed) > parseInt(b.ramSpeed)) {
                return 1
            }
            return 0
        })
        setRamData(newArr)
    }

    const psWattageSort = () => {
        const newArr = [...psData]
        newArr.sort((a, b) => {
            if (a.wattage < b.wattage) {
                return -1
            }
            if (a.wattage > b.wattage) {
                return 1
            }
            return 0
        })
        setPsData(newArr)
    }

    const heatsinkFanSort = () => {
        const newArr = [...heatsinkData]
        newArr.sort((a, b) => {
            if (a.fanNoise < b.fanNoise) {
                return -1
            }
            if (a.fanNoise > b.fanNoise) {
                return 1
            }
            return 0
        })
        setHeatsinkData(newArr)
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

    const isAllCaseManufacturerUnchecked = Object.values(caseFilters.manufacturers).every(value => value === false);
    if (isAllCaseManufacturerUnchecked) {
        setCaseFilters((prev) => ({
            ...prev,
            manufacturers: { ...prev.manufacturers, All: true }
        }))
    }

    const isAllCaseColorsUnchecked = Object.values(caseFilters.colors).every(value => value === false);
    if (isAllCaseColorsUnchecked) {
        setCaseFilters((prev) => ({
            ...prev,
            colors: { ...prev.colors, All: true }
        }))
    }

    const isAllCaseSizesUnchecked = Object.values(caseFilters.sizes).every(value => value === false);
    if (isAllCaseSizesUnchecked) {
        setCaseFilters((prev) => ({
            ...prev,
            sizes: { ...prev.sizes, All: true }
        }))
    }

    const isAllRamManufacturersUnchecked = Object.values(ramFilters.manufacturers).every(value => value === false);
    if (isAllRamManufacturersUnchecked) {
        setRamFilters((prev) => ({
            ...prev,
            manufacturers: { ...prev.manufacturers, All: true }
        }))
    }

    const isAllRamTypesUnchecked = Object.values(ramFilters.ramTypes).every(value => value === false);
    if (isAllRamTypesUnchecked) {
        setRamFilters((prev) => ({
            ...prev,
            ramTypes: { ...prev.ramTypes, All: true }
        }))
    }

    const isAllRamAmountsUnchecked = Object.values(ramFilters.moduleAmounts).every(value => value === false);
    if (isAllRamAmountsUnchecked) {
        setRamFilters((prev) => ({
            ...prev,
            moduleAmounts: { ...prev.moduleAmounts, All: true }
        }))
    }

    const isAllPsManufacturersUnchecked = Object.values(psFilters.manufacturers).every(value => value === false);
    if (isAllPsManufacturersUnchecked) {
        setPsFilters((prev) => ({
            ...prev,
            manufacturers: { ...prev.manufacturers, All: true }
        }))
    }

    const isAllPsWattagesUnchecked = Object.values(psFilters.wattages).every(value => value === false);
    if (isAllPsWattagesUnchecked) {
        setPsFilters((prev) => ({
            ...prev,
            wattages: { ...prev.wattages, All: true }
        }))
    }

    const isAllHeatSinkManufacturersUnchecked = Object.values(heatsinkFilters.manufacturers).every(value => value === false);
    if (isAllHeatSinkManufacturersUnchecked) {
        setHeatsinkFilters((prev) => ({
            ...prev,
            manufacturers: { ...prev.manufacturers, All: true }
        }))
    }

    const isAllHeatsinkCoolingUnchecked = Object.values(heatsinkFilters.cooling).every(value => value === false);
    if (isAllHeatsinkCoolingUnchecked) {
        setHeatsinkFilters((prev) => ({
            ...prev,
            cooling: { ...prev.cooling, All: true }
        }))
    }

    const isAllHardDriveManufacturersUnchecked = Object.values(hardDriveFilters.manufacturers).every(value => value === false);
    if (isAllHardDriveManufacturersUnchecked) {
        setHardDriveFilters((prev) => ({
            ...prev,
            manufacturers: { ...prev.manufacturers, All: true }
        }))
    }

    const isAllHardDriveStoragesUnchecked = Object.values(hardDriveFilters.storages).every(value => value === false);
    if (isAllHardDriveStoragesUnchecked) {
        setHardDriveFilters((prev) => ({
            ...prev,
            storages: { ...prev.storages, All: true }
        }))
    }

    const isAllHardDrivePciesUnchecked = Object.values(hardDriveFilters.pcies).every(value => value === false);
    if (isAllHardDrivePciesUnchecked) {
        setHardDriveFilters((prev) => ({
            ...prev,
            pcies: { ...prev.pcies, All: true }
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

    const handleCaseManufacturerCheckbox = (value: string, checked: boolean) => {
        if (value === 'All') {
            setCaseFilters((prev) => ({
                ...prev,
                manufacturers: { All: true, 'be quiet!': false, 'Cooler Master': false, Corsair: false, 'Fractal Design': false, HYTE: false, 'Lian Li': false, NZXT: false, Phanteks: false, Zalman: false }
            }))
        } else if (value !== 'All') {
            setCaseFilters((prev) => ({
                ...prev,
                manufacturers: {
                    ...prev.manufacturers,
                    All: false,
                    [value]: checked
                }
            }));
        }
    }

    const handleCaseColorsCheckbox = (value: string, checked: boolean) => {
        if (value === 'All') {
            setCaseFilters((prev) => ({
                ...prev,
                colors: { All: true, White: false, Black: false, 'White/Black': false, 'White/Gray': false, 'Gray/Black': false }
            }))
        } else if (value !== 'All') {
            setCaseFilters((prev) => ({
                ...prev,
                colors: {
                    ...prev.colors,
                    All: false,
                    [value]: checked
                }
            }));
        }
    }

    const handleCaseSizesCheckbox = (value: string, checked: boolean) => {
        if (value === 'All') {
            setCaseFilters((prev) => ({
                ...prev,
                sizes: { All: true, 'Mini ITX Desktop': false, 'ATX Mid Tower': false, 'ATX Full Tower': false, 'ATX Tower': false, 'ATX Desktop': false }
            }))
            //setTotalPages(Math.ceil(originalCaseData.length / 6));
        } else if (value !== 'All') {
            setCaseFilters((prev) => ({
                ...prev,
                sizes: {
                    ...prev.sizes,
                    All: false,
                    [value]: checked
                }
            }));
        }
    }

    const handleRamManufacturersCheckbox = (value: string, checked: boolean) => {
        if (value === 'All') {
            setRamFilters((prev) => ({
                ...prev,
                manufacturers: { All: true, Crucial: false, 'G.Skill': false, TEAMGROUP: false }
            }))
            setTotalPages(Math.ceil(originalRamData.length / 6));
        } else if (value !== 'All') {
            setRamFilters((prev) => ({
                ...prev,
                manufacturers: {
                    ...prev.manufacturers,
                    All: false,
                    [value]: checked
                }
            }));
        }
    }

    const handleRamSizesCheckbox = (value: string, checked: boolean) => {
        if (value === 'All') {
            setRamFilters((prev) => ({
                ...prev,
                moduleAmounts: { All: true, '2 x 4GB': false, '2 x 8GB': false, '2 x 16GB': false, '2 x 32GB': false }
            }))
            setTotalPages(Math.ceil(originalRamData.length / 6));
        } else if (value !== 'All') {
            setRamFilters((prev) => ({
                ...prev,
                moduleAmounts: {
                    ...prev.moduleAmounts,
                    All: false,
                    [value]: checked
                }
            }));
        }
    }

    const handleRamTypesCheckbox = (value: string, checked: boolean) => {
        if (value === 'All') {
            setRamFilters((prev) => ({
                ...prev,
                ramTypes: { All: true, DDR3: false, DDR4: false, DDR5: false }
            }))
            setTotalPages(Math.ceil(originalRamData.length / 6));
        } else if (value !== 'All') {
            setRamFilters((prev) => ({
                ...prev,
                ramTypes: {
                    ...prev.ramTypes,
                    All: false,
                    [value]: checked
                }
            }));
        }
    }

    const handlePsManufacturersCheckbox = (value: string, checked: boolean) => {
        if (value === 'All') {
            setPsFilters((prev) => ({
                ...prev,
                manufacturers: { All: true, Asus: false, Corsair: false, EVGA: false, MSI: false, SeaSonic: false, Silverstone: false, 'Super Flower': false, Thermaltake: false }
            }))
            setTotalPages(Math.ceil(originalPsData.length / 6));
        } else if (value !== 'All') {
            setPsFilters((prev) => ({
                ...prev,
                manufacturers: {
                    ...prev.manufacturers,
                    All: false,
                    [value]: checked
                }
            }));
        }
    }

    const handlePsWattagesCheckbox = (value: string, checked: boolean) => {
        if (value === 'All') {
            setPsFilters((prev) => ({
                ...prev,
                wattages: { All: true, 550: false, 600: false, 650: false, 750: false, 760: false, 850: false, 1000: false, 1200: false, 1300: false, 1500: false, 1600: false, 1650: false, 2050: false }
            }))
            setTotalPages(Math.ceil(originalPsData.length / 6));
        } else if (value !== 'All') {
            setPsFilters((prev) => ({
                ...prev,
                wattages: {
                    ...prev.wattages,
                    All: false,
                    [value]: checked
                }
            }));
        }
    }

    const handleHeatsinkManufacturersCheckbox = (value: string, checked: boolean) => {
        if (value === 'All') {
            setHeatsinkFilters((prev) => ({
                ...prev,
                manufacturers: { All: true, ARCTIC: false, 'be quiet!': false, 'Cooler Master': false, Corsair: false, CRYORIG: false, Deepcool: false, EK: false, Noctua: false, NZXT: false, Scythe: false }
            }))
            setTotalPages(Math.ceil(originalHeatsinkData.length / 6));
        } else if (value !== 'All') {
            setHeatsinkFilters((prev) => ({
                ...prev,
                manufacturers: {
                    ...prev.manufacturers,
                    All: false,
                    [value]: checked
                }
            }));
        }
    }

    const handleHeatsinkCoolingCheckbox = (value: string, checked: boolean) => {
        if (value === 'All') {
            setHeatsinkFilters((prev) => ({
                ...prev,
                cooling: { All: true, AirCooled: false, WaterCooled: false }
            }))
            setTotalPages(Math.ceil(originalHeatsinkData.length / 6));
        } else if (value !== 'All') {
            setHeatsinkFilters((prev) => ({
                ...prev,
                cooling: {
                    ...prev.cooling,
                    All: false,
                    [value]: checked
                }
            }));
        }
    }

    const handleHardDriveManufacturersCheckbox = (value: string, checked: boolean) => {
        if (value === 'All') {
            setHardDriveFilters((prev) => ({
                ...prev,
                manufacturers: { All: true, Crucial: false, Sabrent: false, Samsung: false, SanDisk: false, 'SK hynix': false, 'Western Digital': false }
            }))
            setTotalPages(Math.ceil(originalHardDriveData.length / 6));
        } else if (value !== 'All') {
            setHardDriveFilters((prev) => ({
                ...prev,
                manufacturers: {
                    ...prev.manufacturers,
                    All: false,
                    [value]: checked
                }
            }));
        }
    }

    //manufacturers: { All: true, Crucial: false, Sabrent: false, Samsung: false, SanDisk: false, 'SK hynix': false, 'Western Digital': false },
    //storages: { All: true, '250 GB': false, '256 GB': false, '480 GB': false, '500 GB': false, '512 GB': false, '1 TB': false, '2 TB': false },
    //pcies: { All: true, 'SATA 6.0 Gb/s': false, 'M.2 SATA': false, 'M.2 PCIe 3.0 X4': false, 'M.2 PCIe 4.0 X4': false }


    const handleHardDriveStoragesCheckbox = (value: string, checked: boolean) => {
        if (value === 'All') {
            setHardDriveFilters((prev) => ({
                ...prev,
                storages: { All: true, '250 GB': false, '256 GB': false, '480 GB': false, '500 GB': false, '512 GB': false, '1 TB': false, '2 TB': false }
            }))
            setTotalPages(Math.ceil(originalHardDriveData.length / 6));
        } else if (value !== 'All') {
            setHardDriveFilters((prev) => ({
                ...prev,
                storages: {
                    ...prev.storages,
                    All: false,
                    [value]: checked
                }
            }));
        }
    }

    const handleHardDrivePciesCheckbox = (value: string, checked: boolean) => {
        if (value === 'All') {
            setHardDriveFilters((prev) => ({
                ...prev,
                pcies: { All: true, 'SATA 6.0 Gb/s': false, 'M.2 SATA': false, 'M.2 PCIe 3.0 X4': false, 'M.2 PCIe 4.0 X4': false }
            }))
            setTotalPages(Math.ceil(originalHardDriveData.length / 6));
        } else if (value !== 'All') {
            setHardDriveFilters((prev) => ({
                ...prev,
                pcies: {
                    ...prev.pcies,
                    All: false,
                    [value]: checked
                }
            }));
        }
    }

    const filterByPriceRange = (data: any, priceRange: any) => {
        const [minPrice, maxPrice] = priceRange.map(parseFloat);
        return data.filter((obj: any) => {
          const price = parseFloat(obj.price);
          return price >= minPrice && price <= maxPrice;
        });
      };

    function valuetext(maxPrice: number) {
        return `${maxPrice}`;
    }

    const handleSliderChange = (
        event: Event,
        newValue: number | number[],
        activeThumb: number,
      ) => {
        if (!Array.isArray(newValue)) {
          return;
        }
    
        if (newValue[1] - newValue[0] < minDistance) {
          if (activeThumb === 0) {
            const clamped = Math.min(newValue[0], maxPrice[1] - minDistance);
            setMaxPrice([clamped, clamped + minDistance]);
          } else {
            const clamped = Math.max(newValue[1], maxPrice[0] + minDistance);
            setMaxPrice([clamped - minDistance, clamped]);
          }
        } else {
          setMaxPrice(newValue as number[]);
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
                                    <Button className={componentType !== 'Ram' ? 'd-none' : 'mb-2 w-100'} onClick={() => ramSpeedSort()}>SORT BY SPEED</Button>
                                    <Button className={componentType !== 'Ram' ? 'd-none' : 'mb-2 w-100'} onClick={() => ramLatencySort()}>SORT BY LATENCY</Button>

                                    <hr />
                                    <p className='mt-4'>Filter</p>
                                    <button onClick={() => handleComponentSelect(componentType)} className='clearFiltersBtn'>Clear Filters</button>
                                    <hr />
                                    <Slider
                                        getAriaLabel={() => 'Temperature range'}
                                        value={maxPrice}
                                        onChange={handleSliderChange}
                                        valueLabelDisplay="auto"
                                        getAriaValueText={valuetext}
                                    />
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
                                    <p>Case</p>
                                    <div className={componentType !== 'Case' ? 'd-none' : ''}>
                                        {Object.keys(caseFilters.manufacturers).map((key) => (
                                            <div key={key} className='flex justify-content-center gap-2'>
                                                <label className='cursor-pointer'>
                                                    <input
                                                        type='checkbox'
                                                        value={key}
                                                        checked={caseFilters.manufacturers[key]}
                                                        onChange={(e) => handleCaseManufacturerCheckbox(e.target.value, e.target.checked)}
                                                        className='mr-3 cursor-pointer'
                                                    />
                                                    {key}
                                                </label>
                                            </div>
                                        ))}
                                        {Object.keys(caseFilters.colors).map((key) => (
                                            <div key={key} className='flex justify-content-center gap-2'>
                                                <label className='cursor-pointer'>
                                                    <input
                                                        type='checkbox'
                                                        value={key}
                                                        checked={caseFilters.colors[key]}
                                                        onChange={(e) => handleCaseColorsCheckbox(e.target.value, e.target.checked)}
                                                        className='mr-3 cursor-pointer'
                                                    />
                                                    {key}
                                                </label>
                                            </div>
                                        ))}
                                        {Object.keys(caseFilters.sizes).map((key) => (
                                            <div key={key} className='flex justify-content-center gap-2'>
                                                <label className='cursor-pointer'>
                                                    <input
                                                        type='checkbox'
                                                        value={key}
                                                        checked={caseFilters.sizes[key]}
                                                        onChange={(e) => handleCaseSizesCheckbox(e.target.value, e.target.checked)}
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
                    <Button className={componentType !== 'Ram' ? 'd-none' : 'mb-2'} onClick={() => ramSpeedSort()}>SORT BY SPEED</Button>
                    <Button className={componentType !== 'Ram' ? 'd-none' : 'mb-2'} onClick={() => ramLatencySort()}>SORT BY LATENCY</Button>
                    <Button className={componentType !== 'Ps' ? 'd-none' : 'mb-2'} onClick={() => psWattageSort()}>SORT BY WATTAGE</Button>
                    <Button className={componentType !== 'Heatsink' ? 'd-none' : 'mb-2'} onClick={() => heatsinkFanSort()}>SORT BY FAN NOISE</Button>

                    <hr />
                    <p className='mt-4'>Filter</p>
                    <button onClick={() => handleComponentSelect(componentType)} className='clearFiltersBtn'>Clear Filters</button>
                    <hr />
                    <p className='mb-lg-5'>Price</p>
                    <div className='px-4'>
                        <Slider
                            //key={sliderKey}
                            getAriaLabel={() => 'Price range'}
                            value={maxPrice}
                            onChange={handleSliderChange}
                            valueLabelDisplay="on"
                            getAriaValueText={valuetext}
                            min={0}
                            max={fixedPrice}
                            disableSwap
                        />
                    </div>
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
                        <hr />
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
                    <div className={componentType !== 'Case' ? 'd-none' : ''}>
                        <p>Case</p>
                        {Object.keys(caseFilters.manufacturers).map((key) => (
                            <div key={key} className='flex justify-content-center gap-2'>
                                <label className='cursor-pointer'>
                                    <input
                                        type='checkbox'
                                        value={key}
                                        checked={caseFilters.manufacturers[key]}
                                        onChange={(e) => handleCaseManufacturerCheckbox(e.target.value, e.target.checked)}
                                        className='mr-3 cursor-pointer'
                                    />
                                    {key}
                                </label>
                            </div>
                        ))}
                        <hr />
                        <p>Colors</p>
                        {Object.keys(caseFilters.colors).map((key) => (
                            <div key={key} className='flex justify-content-center gap-2'>
                                <label className='cursor-pointer'>
                                    <input
                                        type='checkbox'
                                        value={key}
                                        checked={caseFilters.colors[key]}
                                        onChange={(e) => handleCaseColorsCheckbox(e.target.value, e.target.checked)}
                                        className='mr-3 cursor-pointer'
                                    />
                                    {key}
                                </label>
                            </div>
                        ))}
                        <hr />
                        <p>Sizes</p>
                        {Object.keys(caseFilters.sizes).map((key) => (
                            <div key={key} className='flex justify-content-center gap-2'>
                                <label className='cursor-pointer'>
                                    <input
                                        type='checkbox'
                                        value={key}
                                        checked={caseFilters.sizes[key]}
                                        onChange={(e) => handleCaseSizesCheckbox(e.target.value, e.target.checked)}
                                        className='mr-3 cursor-pointer'
                                    />
                                    {key}
                                </label>
                            </div>
                        ))}
                    </div>
                    <div className={componentType !== 'Ram' ? 'd-none' : ''}>
                        <p>Manufacturer</p>
                        {Object.keys(ramFilters.manufacturers).map((key) => (
                            <div key={key} className='flex justify-content-center gap-2'>
                                <label className='cursor-pointer'>
                                    <input
                                        type='checkbox'
                                        value={key}
                                        checked={ramFilters.manufacturers[key]}
                                        onChange={(e) => handleRamManufacturersCheckbox(e.target.value, e.target.checked)}
                                        className='mr-3 cursor-pointer'
                                    />
                                    {key}
                                </label>
                            </div>
                        ))}
                        <hr />
                        <p>Color</p>
                        {Object.keys(ramFilters.ramTypes).map((key) => (
                            <div key={key} className='flex justify-content-center gap-2'>
                                <label className='cursor-pointer'>
                                    <input
                                        type='checkbox'
                                        value={key}
                                        checked={ramFilters.ramTypes[key]}
                                        onChange={(e) => handleRamTypesCheckbox(e.target.value, e.target.checked)}
                                        className='mr-3 cursor-pointer'
                                    />
                                    {key}
                                </label>
                            </div>
                        ))}
                        <hr />
                        <p>Size</p>
                        {Object.keys(ramFilters.moduleAmounts).map((key) => (
                            <div key={key} className='flex justify-content-center gap-2'>
                                <label className='cursor-pointer'>
                                    <input
                                        type='checkbox'
                                        value={key}
                                        checked={ramFilters.moduleAmounts[key]}
                                        onChange={(e) => handleRamSizesCheckbox(e.target.value, e.target.checked)}
                                        className='mr-3 cursor-pointer'
                                    />
                                    {key}
                                </label>
                            </div>
                        ))}
                    </div>
                    <div className={componentType !== 'Ps' ? 'd-none' : ''}>
                        <p>Manufacturer</p>
                        {Object.keys(psFilters.manufacturers).map((key) => (
                            <div key={key} className='flex justify-content-center gap-2'>
                                <label className='cursor-pointer'>
                                    <input
                                        type='checkbox'
                                        value={key}
                                        checked={psFilters.manufacturers[key]}
                                        onChange={(e) => handlePsManufacturersCheckbox(e.target.value, e.target.checked)}
                                        className='mr-3 cursor-pointer'
                                    />
                                    {key}
                                </label>
                            </div>
                        ))}
                        <hr />
                        <p>Wattage</p>
                        {Object.keys(psFilters.wattages).map((key) => (
                            <div key={key} className='flex justify-content-center gap-2'>
                                <label className='cursor-pointer'>
                                    <input
                                        type='checkbox'
                                        value={key}
                                        checked={psFilters.wattages[key]}
                                        onChange={(e) => handlePsWattagesCheckbox(e.target.value, e.target.checked)}
                                        className='mr-3 cursor-pointer'
                                    />
                                    {key}
                                </label>
                            </div>
                        ))}
                    </div>
                    <div className={componentType !== 'Heatsink' ? 'd-none' : ''}>
                        <p>Manufacturer</p>
                        {Object.keys(heatsinkFilters.manufacturers).map((key) => (
                            <div key={key} className='flex justify-content-center gap-2'>
                                <label className='cursor-pointer'>
                                    <input
                                        type='checkbox'
                                        value={key}
                                        checked={heatsinkFilters.manufacturers[key]}
                                        onChange={(e) => handleHeatsinkManufacturersCheckbox(e.target.value, e.target.checked)}
                                        className='mr-3 cursor-pointer'
                                    />
                                    {key}
                                </label>
                            </div>
                        ))}
                        <hr />
                        <p>Cooling</p>
                        {Object.keys(heatsinkFilters.cooling).map((key) => (
                            <div key={key} className='flex justify-content-center gap-2'>
                                <label className='cursor-pointer'>
                                    <input
                                        type='checkbox'
                                        value={key}
                                        checked={heatsinkFilters.cooling[key]}
                                        onChange={(e) => handleHeatsinkCoolingCheckbox(e.target.value, e.target.checked)}
                                        className='mr-3 cursor-pointer'
                                    />
                                    {key}
                                </label>
                            </div>
                        ))}
                    </div>
                    <div className={componentType !== 'HardDrive' ? 'd-none' : ''}>
                        <p>Manufacturer</p>
                        {Object.keys(hardDriveFilters.manufacturers).map((key) => (
                            <div key={key} className='flex justify-content-center gap-2'>
                                <label className='cursor-pointer'>
                                    <input
                                        type='checkbox'
                                        value={key}
                                        checked={hardDriveFilters.manufacturers[key]}
                                        onChange={(e) => handleHardDriveManufacturersCheckbox(e.target.value, e.target.checked)}
                                        className='mr-3 cursor-pointer'
                                    />
                                    {key}
                                </label>
                            </div>
                        ))}
                        <hr />
                        <p>Storage Capacity</p>
                        {Object.keys(hardDriveFilters.storages).map((key) => (
                            <div key={key} className='flex justify-content-center gap-2'>
                                <label className='cursor-pointer'>
                                    <input
                                        type='checkbox'
                                        value={key}
                                        checked={hardDriveFilters.storages[key]}
                                        onChange={(e) => handleHardDriveStoragesCheckbox(e.target.value, e.target.checked)}
                                        className='mr-3 cursor-pointer'
                                    />
                                    {key}
                                </label>
                            </div>
                        ))}
                        <hr />
                        <p>Storage Type</p>
                        {Object.keys(hardDriveFilters.pcies).map((key) => (
                            <div key={key} className='flex justify-content-center gap-2'>
                                <label className='cursor-pointer'>
                                    <input
                                        type='checkbox'
                                        value={key}
                                        checked={hardDriveFilters.pcies[key]}
                                        onChange={(e) => handleHardDrivePciesCheckbox(e.target.value, e.target.checked)}
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
