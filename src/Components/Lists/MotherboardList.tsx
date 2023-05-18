import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { MotherboardData } from '../../Interfaces/PartDataInterfaces';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { saveToSessionStorageByName } from '../../Services/LocalStorage';

export default function MotherboardList(props: any) {

    const ITEMS_PER_PAGE = 6;
    const startIndex = props.currentPage * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const itemsToDisplay = props.motherboardData.slice(startIndex, endIndex);

    const handleSave = (item:MotherboardData) => {
        saveToSessionStorageByName(item);
    }

    return (
        <div className='cards'>
            {itemsToDisplay.map((item: MotherboardData) => (
                <div key={item.id}>
                    <Card style={{ width: '16rem', height: '100%' }}>
                        <Link to={item.item_url} target='_blank'>
                            <Card.Img className='item-image' variant="top" src={item.image_url} style={{ width: '100%', height: "auto" }} />
                        </Link>
                        <Card.Body>
                            <Link to={item.item_url} target='_blank'><u>{item.title}</u></Link>
                            <div>
                                <div>${item.price}<a className='WishlistBtn' onClick={() => handleSave(item)}><ControlPointIcon /></a></div>
                                <div>Ram Type: {item.ramType}</div>
                                <div>Ram Max: {item.ramMax}</div>
                                <div>Memory Slots: {item.memorySlots}</div>
                                <div>Socket Type: {item.socketType}</div>
                                <div>Chipset: {item.chipset}</div>
                                <div>{item.type}</div>
                                <div># of PCIe Slots: {item.PCIeSlotNumber}</div>
                            </div>

                        </Card.Body>
                    </Card>
                </div>
            ))}
        </div>
    );
}
