import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import { GetLoggedInUserData, createAccount, login } from '../../Services/DataService';
import { GetRandomUserData } from '../../Services/DataService';
const logo = require('../../Assets/Images/BlackLogo.png');


const Login = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    const handleSubmit = async () => {
        
        let userData = {
            username,
            password
        }
        console.log(userData);
        let token = await login(userData);
        if(token.token != null){
            localStorage.setItem('Token', token.token);
            // await GetLoggedInUserData(username);
            navigate('/');
        }
        
    }

    const getUserData = async () => {
        let data = await GetRandomUserData();
        console.log(data);
    }

    // getUserData();

    return (
        <div className='login-wrapper d-flex justify-content-center align-items-center'>
            <div className="login-container position-relative">
                <Container className="left-login">
                    <Row className='left-login-top mt-4'>
                        <Col className='d-flex justify-content-center align-items-center'>
                            <img src={logo}></img>
                            <h1>BuildComp</h1>
                        </Col>
                    </Row>
                </Container>
                <Container className="right-login">
                    <Row className='justify-content-center'>
                        <Col >
                            <h3 className='m-0'>Welcome back</h3>
                            <p>Please login to your account.</p>
                            <label className='w-100'>
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
                            <button className='login-btn' onClick={handleSubmit}>Login</button>
                            <div className='divider'>
                                <hr ></hr>
                                <p className='or'>or</p>
                            </div>
                            <button className='login-btn' onClick={() => navigate('/')}>Continue as guest</button>
                            <p className='create-account'>Don't have an account? <span onClick={() => navigate('/SignUp')}>Sign up</span></p>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
}

export default Login;