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

interface WishlistData {
    id:number;
    username: string;
    title: string;
    price: string;
    image_url: string;
    item_url: string;
    type: string;
}

export { WishlistData, CpuData, GpuData, CaseData, HardDriveData, MotherboardData, HeatsinkData, PowerSupplyData, RamData}