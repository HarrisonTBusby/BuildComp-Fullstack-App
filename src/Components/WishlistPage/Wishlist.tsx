import React from 'react'
import './Wishlist.css';
import { Link } from 'react-router-dom';
import WishlistRow from './WishlisltComp';
import NavbarComponent from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Navbar } from 'react-bootstrap';
export default function Wishlist() {
  return (
    <div> 
      <NavbarComponent/>
      <WishlistRow/>
      <Footer/>
    </div>
  )
}
