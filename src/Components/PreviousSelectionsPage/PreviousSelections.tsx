import React, { FC } from 'react'
import './PreviousSelections.css';
import {NavbarComponent} from '../Navbar/Navbar';

import { Link } from 'react-router-dom';
import {Container, Row, Col,} from 'react-bootstrap'
import SelectionsRow from './previousRows'
import {Footer} from '../Footer/Footer'

interface Props {}


export const PreviousSelections : FC<Props> = () => {
  return (


    <div className=''>
<NavbarComponent/>


<SelectionsRow/>








<br></br>
<br></br>

<br></br>
<br></br>

<br></br>

<Row className='footerr'>
<Footer/>
</Row>
    </div>







  )
}
