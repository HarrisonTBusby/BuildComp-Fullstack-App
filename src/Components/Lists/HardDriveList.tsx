import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { HardDriveData, WishlistData } from '../../Interfaces/PartDataInterfaces';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { AddWishlistItems } from '../../Services/DataService';
import { saveToSessionStorageByName } from '../../Services/LocalStorage';

export default function HardDriveList(props: any) {
    const ITEMS_PER_PAGE = 6;
    const startIndex = props.currentPage * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const itemsToDisplay = props.hardDriveData.slice(startIndex, endIndex)
    const usernameData = sessionStorage.getItem("Username");
    let data = localStorage.getItem('BuildCompToken');

    const handleSave = async (item: HardDriveData) => {
        const data: WishlistData = {
          id: 0, // Set the desired value for the id property
          username: usernameData || '',
          title: item.title,
          price: item.price,
          image_url: item.image_url,
          item_url: item.item_url,
          type: item.type,
        };
        saveToSessionStorageByName(item.title);
        await AddWishlistItems(data);
      };

      const guestAdd = (item: HardDriveData) => {
        if(data === 'guest'){
            return null;
        }else{
            return <a className='WishlistBtn' onClick={async() => await handleSave(item)}><ControlPointIcon /></a>
        }

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
                                <div>${item.price}{guestAdd(item)}</div>
                                <div>Storage: {item.storageCapacity}</div>
                                <div>PCIe: {item.pcIeType}</div>
                                <div>{item.type}</div>
                            </div>

                        </Card.Body>
                    </Card>
                </div>
            ))}
        </div>
    )
}