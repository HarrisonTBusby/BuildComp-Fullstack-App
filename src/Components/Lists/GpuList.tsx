import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { GpuData } from '../../Interfaces/PartDataInterfaces';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { saveToSessionStorageByName } from '../../Services/LocalStorage';

export default function GpuList(props: any) {
    const ITEMS_PER_PAGE = 6;
    const startIndex = props.currentPage * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const itemsToDisplay = props.gpuData.slice(startIndex, endIndex);

    const handleSave = (item:GpuData) => {
        saveToSessionStorageByName(item);
    }

    return (
        <div className='cards'>
            {itemsToDisplay.map((item: GpuData) =>
                <div key={item.id}>
                    <Card style={{ width: '16rem', height: '100%' }}>
                        <Link to={item.item_url} target='_blank'>
                            <Card.Img className='item-image' variant="top" src={item.image_url} style={{ width: '100%', height: "auto" }} />
                        </Link>
                        <Card.Body>
                            <Link to={item.item_url} target='_blank'><u>{item.title}</u></Link>
                            <div>
                                <div>${item.price}<a className='WishlistBtn' onClick={() => handleSave(item)}><ControlPointIcon /></a></div>
                                <div>Memory: {item.memory}</div>
                                <div>Performance Clock: {item.perfCoreClock}</div>
                                <div>Chipset: {item.chipset}</div>
                                <div>{item.type}</div>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            )}
        </div>
    )
}