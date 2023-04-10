import React, { useEffect, useState } from 'react'
import './PreviousSelections.css';
import NavbarComponent from '../Navbar/Navbar';
import Footer from '../Footer/Footer'
import { PaginationExample } from '../Pagination';
import { GetRandomUserData } from '../../Services/DataService';
import { get } from 'https';

export default function PreviousSelections() {
  
  return (
    <>
      <NavbarComponent />
      <div className='mt-4'>
      <PaginationExample />
      </div>
      <Footer />
    </>
  );
}
