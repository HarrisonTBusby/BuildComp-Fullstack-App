import React from 'react'
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Col } from 'react-bootstrap';

const Wishlist = () => {
  return (
    <div>
      <Navbar />
      <div className='d-flex justify-content-center'>
        <Col className='wishlist-content'>
        </Col>
      </div>
      <Footer />
    </div>
  )
};

export default Wishlist;



