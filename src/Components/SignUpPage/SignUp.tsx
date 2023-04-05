import React from 'react'
import './SignUp.css';
import { Link } from 'react-router-dom';
const logo = require('../../Assets/Images/BlackLogo.png');

export default function SignUp() {
  return (
    <div className='signup-wrapper'>
            <div className="signup-container">
                <div className="left-signup">
                    <div className='left-signup-top'>
                        <img className="logo" src={logo}></img>
                        <h1>BuildComp</h1>
                    </div>
                </div>
                <div className="right-signup">
                    <h3>Create an account</h3>
                    <p>Please enter your details to get started.</p>
                    <label className='w-100 mb-4'>
                        Username
                        <div>
                            <input type="text" name="username"></input>
                        </div>
                    </label>
                    <label className='w-100'>
                        Password
                        <div>
                            <input type="password" name="password"></input>
                        </div>
                    </label>
                    <Link to='/login'><button className='signup-btn'>Sign Up</button></Link>
                </div>
            </div>
        </div>
  )
}
