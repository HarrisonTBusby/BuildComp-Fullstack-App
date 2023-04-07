import React from 'react'
import './Wishlist.css';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Col, Card, Button } from 'react-bootstrap';
// import { Navbar } from 'react-bootstrap';

const Wishlist = () => {
  return (
    <div>
      <Navbar />
      <div className='d-flex justify-content-center'>
        
      
      <Col className='wishlist-content'>
        <Card style={{ width: '16rem' }}>
          <Card.Img variant="top" src="https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T2/images/I/51c1zFDNVmL._AC_SX679_.jpg" />
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>
        <Card style={{ width: '16rem' }}>
          <Card.Img variant="top" src="https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T2/images/I/51c1zFDNVmL._AC_SX679_.jpg" />
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>
        <Card style={{ width: '16rem' }}>
          <Card.Img variant="top" src="https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T2/images/I/51c1zFDNVmL._AC_SX679_.jpg" />
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>
        <Card style={{ width: '16rem' }}>
          <Card.Img variant="top" src="https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T2/images/I/51c1zFDNVmL._AC_SX679_.jpg" />
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>
      </Col>
      </div>
      <Footer />
    </div>
  )
};

export default Wishlist;



