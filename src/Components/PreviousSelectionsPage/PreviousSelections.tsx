import React from 'react'
import './PreviousSelections.css';
import NavbarComponent from '../Navbar/Navbar';
import Footer from '../Footer/Footer'
import { PaginationExample } from '../Pagination';

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
