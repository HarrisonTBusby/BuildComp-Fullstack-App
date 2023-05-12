import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { CaseData } from '../../Interfaces/PartDataInterfaces';

export default function CaseList(props: any) {

    const ITEMS_PER_PAGE = 6;
    const startIndex = props.currentPage * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const itemsToDisplay = props.caseData.slice(startIndex, endIndex);

  return (
    <div className='cards'>
    {itemsToDisplay.map((item: CaseData) => (
        <div key={item.id}>
            <Card style={{ width: '16rem', height: '100%' }}>
                <Link to={item.item_url} target='_blank'>
                    <Card.Img className='item-image' variant="top" src={item.image_url} style={{ width: '100%', height: "auto" }} />
                </Link>
                <Card.Body>
                    <Link to={item.item_url} target='_blank'><u>{item.title}</u></Link>
                    <div>
                        <div>${item.price}</div>
                        <div>Size: {item.size}</div>
                        <div>Color: {item.caseColor}</div>
                        <div>{item.type}</div>
                    </div>
                </Card.Body>
            </Card>
        </div>
    ))}
</div>
  )
}