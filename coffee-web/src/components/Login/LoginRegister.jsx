import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginRegister.css';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { auth, db } from '../Login/firebase'; // Firebase configuration
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginRegister = ({ setIsAuthenticated, setUsername }) => {
  const [action, setAction] = useState('');
  const navigate = useNavigate();
  const [username, setUsernameState] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('customer'); // Default role
  const [isLogin, setIsLogin] = useState(true);

  const handleUsernameChange = (e) => setUsernameState(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleRoleChange = (e) => setRole(e.target.value);

  const validateForm = () => {
    if (!password || (!isLogin && (!username || !email))) {
      toast.error('All fields are required.');
      return false;
    }
    if (!isLogin && !/\S+@\S+\.\S+/.test(email)) {
      toast.error('Invalid email address.');
      return false;
    }
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (isLogin) {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUsername(userData.username);

          if (userData.role === 'admin') {
            navigate('/admin-dashboard');
          } else if (userData.role === 'customer') {
            navigate('/home');
          } else {
            toast.error('Unauthorized role.');
          }
        } else {
          toast.error('User data not found.');
        }

        setIsAuthenticated(true);
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await setDoc(doc(db, 'users', user.uid), {
          username: username,
          email: email,
          role: role,
        });
        toast.success('Registration successful. Please log in.');
        setAction('');
      }
    } catch (error) {
      toast.error(error.message);
      console.error(isLogin ? 'Login error:' : 'Registration error:', error);
    }
  };

  const registerLink = () => {
    setIsLogin(false);
    setAction(' active');
  };

  const loginLink = () => {
    setIsLogin(true);
    setAction('');
  };

  return (
    <div className="bodyform h-screen flex justify-center items-center">
      <ToastContainer />
      <div className="content">
        <div className={`wrapper${action}`}>
          {/* Login Form */}
          <div className={`form-box login ${isLogin ? 'active' : ''} min-h-[500px]`}>
            <form onSubmit={handleSubmit}>
              <h1>Login</h1>
              <div className="input-box mb-4">
                <FaEnvelope className="icon" />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  onChange={handleEmailChange}
                  value={email}
                  className="w-full p-3 mt-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
              <div className="input-box mb-4">
                <FaLock className="icon" />
                <input
                  type="password"
                  placeholder="Password"
                  required
                  onChange={handlePasswordChange}
                  value={password}
                  className="w-full p-3 mt-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
              <div className="remember-forgot mb-4 mt-8 flex justify-between items-center">
                <label>
                  <input type="checkbox" /> Remember me!
                </label>
                <a href="#">Forgot password?</a>
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                Login
              </button>
              <div className="register-link mt-4 text-center">
                <p>
                  {"Don't have an account?"}{' '}
                  <a href="#" onClick={registerLink}>
                    Register
                  </a>
                </p>
              </div>
            </form>
          </div>

          {/* Register Form */}
          <div className={`form-box register ${!isLogin ? 'active' : ''}`}>
            <form onSubmit={handleSubmit}>
              <h1 className="mt-3">Registration</h1>
              <div className="input-box mb-2">
                <FaUser className="icon" />
                <input
                  type="text"
                  placeholder="Username"
                  required
                  onChange={handleUsernameChange}
                  value={username}
                  className="w-full p-3 mt-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
              <div className="input-box mb-4">
                <FaEnvelope className="icon" />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  onChange={handleEmailChange}
                  value={email}
                  className="w-full p-3 mt-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
              <div className="input-box mb-4">
                <FaLock className="icon" />
                <input
                  type="password"
                  placeholder="Password"
                  required
                  onChange={handlePasswordChange}
                  value={password}
                  className="w-full p-3 mt-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              {/* Role Dropdown */}
              <div className="input-box mb-4 mt-1">
                <label htmlFor="role" className="text-lg font-semibold text-gray-700 mb-2">
                  Role
                </label>
                <select
                  id="role"
                  value={role}
                  onChange={handleRoleChange}
                  required
                  className="block w-full p-3 mt-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                >
                  <option value="customer">Customer</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              {/* Agreement Checkbox */}
              <div className="mt-8 remember-forgot mb-4">
                <label>
                  <input type="checkbox" required /> I agree to the terms & conditions
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                Register
              </button>
              <div className="register-link mt-4 text-center">
                <p>
                  Already have an account?{' '}
                  <a href="#" onClick={loginLink}>
                    Login
                  </a>
                </p>
              </div>
            </form>
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
