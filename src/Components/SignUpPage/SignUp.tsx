import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { createAccount } from '../../Services/DataService';
const logo = require('../../Assets/Images/BlackLogo.png');

export default function SignUp() {
    const navigate = useNavigate();

    const [Username, setUsername] = useState(null);
    const [Password, setPassword] = useState(null);

    const handleSubmit = () => {
        let userData = {
            Id: 0,
            Username,
            Password
        }
        console.log(userData);
        createAccount(userData);
        navigate('/Login');
    }

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
                            <input 
                                type="text" 
                                name="username"
                                onChange={({target: {value}}: any) => setUsername(value)}
                            />
                        </div>
                    </label>
                    <label className='w-100'>
                        Password
                        <div>
                            <input 
                                type="password" 
                                name="password"
                                onChange={({target: {value}}: any) => setPassword(value)}
                            />
                        </div>
                    </label>
                    <button className='signup-btn' onClick={handleSubmit}>Sign Up</button>
                </div>
            </div>
        </div>
  )
}
