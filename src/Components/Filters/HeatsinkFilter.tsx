import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

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

const HeatsinkFilter = (props: any) => {
    const ITEMS_PER_PAGE = 6;
    const startIndex = props.currentPage * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        const itemsToDisplay = props.heatsinkData.slice(startIndex, endIndex);

        return (
            <div className='cards'>
                {itemsToDisplay.map((item: HeatsinkData) => (
                    <div key={item.id}>
                        <Card style={{ width: '16rem', height: '100%' }}>
                            <Link to={item.item_url} target='_blank'>
                                <Card.Img className='item-image' variant="top" src={item.image_url} style={{height: 'auto', width: '254px'}}/>
                            </Link>
                            <Card.Body>
                                <Link to={item.item_url} target='_blank'><u>{item.title}</u></Link>
                                <div>
                                    <div>${item.price}</div>
                                    <div>Color: {item.color}</div>
                                    <div>RPM: {item.fanRPM}</div>
                                    <div>Noise Level: {item.fanNoise}</div>
                                    <div>Water Cooled: {item.isWaterCooled.toString()}</div>
                                    <div>{item.type}</div>
                                </div>

                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>
        );
}

export default HeatsinkFilter