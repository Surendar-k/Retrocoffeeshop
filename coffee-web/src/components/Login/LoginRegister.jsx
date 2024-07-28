import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginRegister.css';
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import PropTypes from 'prop-types';

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (isLogin) {
      const user = { username: username, password };
      console.log('User:', user);
      // Verify login credentials
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (storedUser && storedUser.username === username && storedUser.password === password) {
        setIsAuthenticated(true);
        setUsername(username); // Set the username
        navigate('/');
      } else {
        setMessage('Invalid username or password.');
      }
    } else {
      const newUser = { username, email, password };
      console.log('newUser:', newUser);
      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify(newUser));
      setMessage('Registration successful. Please log in.');
      setAction('');
    }
  };

  const validateForm = () => {
    if (!username || !password || (!isLogin && !email)) {
      setMessage('All fields are required.');
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
