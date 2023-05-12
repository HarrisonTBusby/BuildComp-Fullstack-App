import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

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

export default function CpuList(props: any) {

        const ITEMS_PER_PAGE = 6;
        const startIndex = props.currentPage * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        const itemsToDisplay = props.cpuData.slice(startIndex, endIndex);

        return (
            <div className='cards'>
                {itemsToDisplay.map((item: CpuData) => (
                    <div key={item.id}>
                        <Card style={{ width: '16rem', height: '100%' }}>
                            <Link to={item.item_url} target='_blank'>
                                <Card.Img className='item-image' variant="top" src={item.image_url} style={{ width: '100%', height: '16rem', margin: '0 auto' }} />
                            </Link>
                            <Card.Body>
                                <Link to={item.item_url} target='_blank'><u>{item.title}</u></Link>
                                <div>
                                    <div>${item.price}</div>
                                    <div>Cores: {item.cores}</div>
                                    <div>Performance Clock: {item.perfCoreClock}</div>
                                    <div>{item.type}</div>
                                </div>

                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>
        );
  
}

