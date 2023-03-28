import BuildCompLogo from '../../Assets/Logo.png'
import './Login.css';
import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <div className='login-wrapper'>
            <div className="login-container">
                <div className="left-login">
                    <div className='left-login-top'>
                        <img className="logo" src={BuildCompLogo}></img>
                        <h1>BuildComp</h1>
                    </div>
                </div>
                <div className="right-login">
                    <h1>Welcome back</h1>
                    <p>Please login to your account.</p>
                    <label style={{display: 'block'}}>
                        Username
                        <div>
                            <input type="text" name="username"></input>
                        </div>
                    </label>
                    <label style={{display: 'block'}}>
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
                </div>
            </div>
        </div>
    );
}

export default Login;