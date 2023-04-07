import React from 'react'
import './Wishlist.css';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Col, Card, Button } from 'react-bootstrap';
// import { Navbar } from 'react-bootstrap';
import { PaginationExample } from '../Pagination';

const Wishlist = () => {
  return (
    <div>
      <Navbar />
      <div className='d-flex justify-content-center'>
        
      
      <Col className='wishlist-content'>
        <PaginationExample />
      </Col>
      </div>
      <Footer />
    </div>
  )
};

export default Wishlist;



