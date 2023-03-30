import React, {FC} from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';

interface Props {}

export const Login: FC<Props> = () => {
    return (
        <Container className='login-wrapper d-flex justify-content-center align-items-center'>
            <Container className="login-container position-relative">
                <Container className="left-login">
                    <Row className='left-login-top mt-4'>
                        <Col className='d-flex justify-content-center align-items-center'>
                            <img className="login-logo" src='../../Assets/Logo.png' alt='BuildComp logo'></img>
                            <h1>BuildComp</h1>
                        </Col>
                    </Row>
                </Container>
                <Container className="right-login">
                    <Row className='justify-content-center'>
                        <Col md='6'>
                            <h2>Welcome back</h2>
                            <p>Please login to your account.</p>
                            <label className='w-100'>
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
                            <button className='login-btn'>Login</button>
                            <div className='divider'>
                                <hr ></hr>
                                <p className='or'>or</p>
                            </div>
                            <Link to='/'><button className='login-btn'>Continue as guest</button></Link>
                            <p className='create-account'>Don't have an account <Link to='/SignUp'>Sign up</Link></p>
                        </Col>
                    </Row>
                </Container>
            </Container>
        </Container>
    );
}

export default Login;