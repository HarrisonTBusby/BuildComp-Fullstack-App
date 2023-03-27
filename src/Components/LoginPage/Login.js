import BuildCompLogo from '../../Assets/BuildComp Logo.png'
import './Login.css';
import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <div className='login-wrapper'>
            <div className="login-container">
                <div className="left-login">
                    <div>
                        <img className="logo" src={BuildCompLogo}></img>
                        <h1>Build Comp</h1>
                    </div>
                </div>
                <div className="right-login">
                    Words
                </div>
            </div>
        </div>
    );
}

export default Login;