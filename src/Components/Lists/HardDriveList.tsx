import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { HardDriveData } from '../../Interfaces/PartDataInterfaces';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { saveToSessionStorageByName } from '../../Services/LocalStorage';

export default function HardDriveList(props: any) {
    const ITEMS_PER_PAGE = 6;
    const startIndex = props.currentPage * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const itemsToDisplay = props.hardDriveData.slice(startIndex, endIndex)

    const handleSave = (item:HardDriveData) => {
        saveToSessionStorageByName(item);
    }

    return (
        <div className='cards'>
            {itemsToDisplay.map((item: HardDriveData) => (
                <div key={item.id}>
                    <Card style={{ width: '16rem', height: '100%' }}>
                        <Link to={item.item_url} target='_blank'>
                            <Card.Img className='item-image' variant="top" src={item.image_url} style={{ width: '100%', height: "auto" }} />
                        </Link>
                        <Card.Body>
                            <Link to={item.item_url} target='_blank'><u>{item.title}</u></Link>
                            <div>
                                <div>${item.price}<a className='WishlistBtn' onClick={() => handleSave(item)}><ControlPointIcon /></a></div>
                                <div>Storage: {item.storageCapacity}</div>
                                <div>PCIe: {item.PCIeType}</div>
                                <div>{item.type}</div>
                            </div>

                        </Card.Body>
                    </Card>
                </div>
            ))}
        </div>
    )
}