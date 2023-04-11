import React, { useEffect, useState } from 'react'
import NavbarComponent from '../Navbar/Navbar';
import Footer from '../Footer/Footer'
import { PaginationExample } from '../Pagination/Pagination';

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
