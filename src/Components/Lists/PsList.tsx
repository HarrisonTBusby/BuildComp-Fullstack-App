import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { PowerSupplyData } from '../../Interfaces/PartDataInterfaces';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { saveToSessionStorageByName } from '../../Services/LocalStorage';

export default function PsList(props: any) {
    const ITEMS_PER_PAGE = 6;
    const startIndex = props.currentPage * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const itemsToDisplay = props.psData.slice(startIndex, endIndex);

    const handleSave = (item:PowerSupplyData) => {
        saveToSessionStorageByName(item);
    }

    return (
        <div className='cards'>
            {itemsToDisplay.map((item: PowerSupplyData) => (
                <div key={item.id}>
                    <Card style={{ width: '16rem', height: '100%' }}>
                        <Link to={item.item_url} target='_blank'>
                            <Card.Img className='item-image' variant="top" src={item.image_url} style={{ width: '100%', height: "auto" }} />
                        </Link>
                        <Card.Body>
                            <Link to={item.item_url} target='_blank'><u>{item.title}</u></Link>
                            <div>
                                <div>${item.price}<a className='WishlistBtn' onClick={() => handleSave(item)}><ControlPointIcon /></a></div>
                                <div>Wattage: {item.wattage}</div>
                                <div>Color: {item.color}</div>
                                <div>EPS8: {item.EPS8ConnectorNum}</div>
                                <div>PCIe 6+2: {item.PCIe62ConnectorNum}</div>
                                <div>PCIe 6: {item.PCIe6ConnectorNum}</div>
                                <div>Sata: {item.SataConnectors}</div>
                                <div>Molex 4: {item.Molex4ConnectorNum}</div>
                                <div>Color: {item.color}</div>
                                <div>{item.type}</div>
                            </div>

                        </Card.Body>
                    </Card>
                </div>
            ))}
        </div>
    )
}