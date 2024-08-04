import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginRegister.css';
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import PropTypes from 'prop-types';
import { auth } from './firebase';  // Import the auth object from firebase.js
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

const LoginRegister = ({ setIsAuthenticated, setUsername }) => {
  const [action, setAction] = useState('');
  const navigate = useNavigate();
  const [username, setUsernameState] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState('');

  const handleUsernameChange = (e) => setUsernameState(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (isLogin) {
        // Login user
        await signInWithEmailAndPassword(auth, email, password);
        setIsAuthenticated(true);
        setUsername(username);  // Set the username for the current session
        navigate('/');
      } else {
        // Register new user
        await createUserWithEmailAndPassword(auth, email, password);
        setMessage('Registration successful. Please log in.');
        setAction('');
      }
    } catch (error) {
      setMessage(error.message);
      console.error(isLogin ? 'Login error:' : 'Registration error:', error);
    }
  };

  const validateForm = () => {
    if (!username || !password || (!isLogin && !email)) {
      setMessage('All fields are required.');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setMessage('Invalid email address.');
      return false;
    }
    if (password.length < 6) {
      setMessage('Password must be at least 6 characters long.');
      return false;
    }
    return true;
  };

  const registerLink = () => setAction(' active');
  const loginLink = () => setAction('');

  return (
    <div className="bodyform">
      <div className="content">
        <div className={`wrapper${action}`}>
          <div className="form-box login">
            <form onSubmit={handleSubmit}>
              <h1>Login</h1>
              <div className="input-box">
                <FaUser className='icon' />
                <input type="text" placeholder='Username' required onChange={handleUsernameChange} />
              </div>
              <div className="input-box">
                <FaLock className='icon' />
                <input type="password" placeholder='Password' required onChange={handlePasswordChange} />
              </div>
              <div className="remember-forgot">
                <label><input type="checkbox" />Remember me!</label>
                <a href="#">Forgot password?</a>
              </div>
              <button type='submit' onClick={() => setIsLogin(true)}>Login</button>
              <div className="register-link">
                <p>{"Don't have an account?"} <a href="#" onClick={registerLink}>Register</a></p>
              </div>
            </form>
            {isLogin && message && <p>{message}</p>}
          </div>
          <div className="form-box register">
            <form onSubmit={handleSubmit}>
              <h1>Registration</h1>
              <div className="input-box">
                <FaUser className='icon' />
                <input type="text" placeholder='Username' required onChange={handleUsernameChange} />
              </div>
              <div className="input-box">
                <FaEnvelope className='icon' />
                <input type="email" placeholder='Email' required onChange={handleEmailChange} />
              </div>
              <div className="input-box">
                <FaLock className='icon' />
                <input type="password" placeholder='Password' required onChange={handlePasswordChange} />
              </div>
              <div className="remember-forgot">
                <label><input type="checkbox" required />I agree to the terms & conditions</label>
              </div>
              <button type='submit' onClick={() => setIsLogin(false)}>Register</button>
              <div className="register-link">
                <p>Already have an account? <a href="#" onClick={loginLink}>Login</a></p>
              </div>
            </form>
            {!isLogin && message && <p>{message}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

LoginRegister.propTypes = {
  setIsAuthenticated: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
};

export default LoginRegister;
