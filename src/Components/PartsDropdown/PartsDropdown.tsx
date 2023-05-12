import { useState } from 'react';
import { Dropdown, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { GetPartData } from '../../Services/DataService';
import React from 'react';

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

interface GpuData {
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


function PartsDropdown() {

    const [cpuData, setCpuData] = useState<CpuData[]>([]);
    const [gpuData, setGpuData] = useState<GpuData[]>([]);
    const [motherboardData, setMotherboardData] = useState<MotherboardData[]>([]);
    const [caseData, setCaseData] = useState<CaseData[]>([]);
    const [ramData, setRamData] = useState<RamData[]>([]);
    const [psData, setPsData] = useState<PowerSupplyData[]>([]);
    const [heatsinkData, setHeatsinkData] = useState<HeatsinkData[]>([]);
    const [hardDriveData, setHardDriveData] = useState<HardDriveData[]>([]);
    const [totalItems, setTotalItems] = useState(0);
    const [componentType, setComponentType] = useState<string>('default');

    const renderTooltip = (content: string) => {
        return <Tooltip id='button-tooltip'>{content}</Tooltip>;
    };

    async function handleComponentSelect(component: string) {
        
        const data = await GetPartData(component);
        if(component == "Cpu"){
            setCpuData(data);
            setTotalItems(data.length)
            setComponentType('Cpu')
        }else if(component == "Gpu"){
            setGpuData(data);
            setTotalItems(data.length)
            setComponentType('Gpu')
        }else if(component == "Motherboard"){
            setMotherboardData(data);
            setTotalItems(data.length)
            setComponentType('Motherboard')
        }else if(component == "Case"){
            setCaseData(data)
            setTotalItems(data.length)
            setComponentType('Case')
        }else if(component == "Ram"){
            setRamData(data)
            setTotalItems(data.length)
            setComponentType('Ram')
        }else if(component == 'Ps'){
            setPsData(data)
            setTotalItems(data.length)
            setComponentType('Ps')
        }else if(component == "Heatsink"){
            setHeatsinkData(data)
            setTotalItems(data.length)
            setComponentType('Heatsink')
        }else if(component == "HardDrive"){
            setTotalItems(data.length)
            setHardDriveData(data)
            setComponentType('HardDrive')
        }
        console.log(data);
        
    }

  return (
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
  )
}

export default PartsDropdown