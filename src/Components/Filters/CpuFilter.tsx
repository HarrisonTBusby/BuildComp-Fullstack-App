import { Col, Dropdown, InputGroup, OverlayTrigger, Tooltip, Button, Card } from 'react-bootstrap';
import React, { ComponentType, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PartsDropdown from "../PartsDropdown/PartsDropdown";


export default function CpuFilter() {
    const [minBudget, setMinBudget] = useState<string>('');
    const [maxBudget, setMaxBudget] = useState<string>('');

   
    const handleMinBudget = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key == 'Enter') {
            setMinBudget(event.currentTarget.value);
        }
    };

    const handleMaxBudget = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key == 'Enter') {
            setMaxBudget(event.currentTarget.value);
        }
    };

  return (
    <Col className='filterBackground large-filter p-3' md={3}>
    <div className='marginLeft2 filterBoxColor'>
    <button>SORT BY PRICE</button>
        <Col className='marginLeft mt-5 mb-5'>
        <p className='mt-5'>Components</p>
       <PartsDropdown/>
        </Col>
        <p className='mt-4'>Filter</p>
        <button className='clearFiltersBtn'>Clear Filters</button>
        <hr />
        {/* Budget */}
        {/* ====================================================================== */}
        <p>Budget</p>
        <input className='w-75' type='number' placeholder='Min' value={minBudget} onKeyDown={handleMinBudget} onChange={(event) => setMinBudget(event.currentTarget.value)}></input>
        <input className='w-75' type='number' placeholder='Max' value={maxBudget} onKeyDown={handleMaxBudget} onChange={(event) => setMaxBudget(event.currentTarget.value)}></input>
        {/* PC Components */}
        {/* ====================================================================== */}
        
        {/* Better Price or Better Performance */}
        {/* ================================================== */}
        <p className='mt-5'>Better Price or Better Performance</p>
        <InputGroup className="mb-3">
            <InputGroup.Checkbox />Better price
        </InputGroup>
        <InputGroup className="mb-3">
            <InputGroup.Checkbox />Better performance
        </InputGroup>
    </div>
</Col>
  )
}

