import React, { useEffect, useState } from 'react'
import NavbarComponent from '../Navbar/Navbar';
import Footer from '../Footer/Footer'
import {Button, Modal, }  from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function PreviousSelections() {
  const navigate = useNavigate();
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const GuestView = () => {
    let token = localStorage.getItem('Token');
     if(token == 'guest'){
       return (
         <>
   
       <Modal
         show={show}
         onHide={handleClose}
         backdrop="static"
         keyboard={false}
       >
         <Modal.Body>
           You will need to sign up to see more features
         </Modal.Body>
         <Modal.Footer className='d-flex justify-content-between'>
           <Button variant="primary" onClick={() => navigate('/SignUp')}>Create Account?</Button>
           <Button variant="primary" onClick={() => navigate('/Login')}>Login</Button>
         </Modal.Footer>
       </Modal>
       </>
       )
     }else{
       return null;
     }
   }

  return (
    <>
      <NavbarComponent />
      <div className='mt-4'>
        <GuestView/>
      </div>
      <Footer />
    </>
  );
}
