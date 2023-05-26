import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { HeatsinkData, WishlistData } from '../../Interfaces/PartDataInterfaces';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { AddWishlistItems } from '../../Services/DataService';
import { saveToSessionStorageByName } from '../../Services/LocalStorage';

export default function HeatsinkList(props: any) {
    const ITEMS_PER_PAGE = 6;
    const startIndex = props.currentPage * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const itemsToDisplay = props.heatsinkData.slice(startIndex, endIndex);
    const usernameData = sessionStorage.getItem("Username");
    let data = localStorage.getItem('BuildCompToken');

    const handleSave = async (item: HeatsinkData) => {
        const data: WishlistData = {
          id: 0, // Set the desired value for the id property
          username: usernameData || '',
          title: item.title,
          price: item.price,
          image_url: item.image_url,
          item_url: item.item_url,
          type: item.type,
        };
        await AddWishlistItems(data);
      };

      const guestAdd = (item: HeatsinkData) => {
        if(data === 'guest'){
            return null;
        }else{
            return <a className='WishlistBtn' onClick={async() => await handleSave(item)}><ControlPointIcon /></a>
        }

      }

    return (
        <div className='cards'>
            {itemsToDisplay.map((item: HeatsinkData) => (
                <div key={item.id}>
                    <Card style={{ width: '16rem', height: '100%' }}>
                        <Link to={item.item_url} target='_blank'>
                            <Card.Img className='item-image' variant="top" src={item.image_url} style={{ height: 'auto', width: '254px' }} />
                        </Link>
                        <Card.Body>
                            <Link to={item.item_url} target='_blank'><u>{item.title}</u></Link>
                            <div>
                                <div>${item.price}{guestAdd(item)}</div>
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

