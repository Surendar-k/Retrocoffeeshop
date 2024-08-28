import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Menu from "./components/Menu";
import Aboutus from "./components/Aboutus";
import Product from "./components/Product";
import Footer from "./components/Footer";
import Reviews from "./components/Reviews";
import LoginRegister from "./components/Login/LoginRegister";
import OrderEntry from "./components/OrderEntry";
//lk
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    const storedUsername = localStorage.getItem('username');
    if (storedAuth === 'true') {
      setIsAuthenticated(true);
      setUsername(storedUsername || '');
    }
  }, []);

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername('');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('username');
  };

  const handleLogin = (username) => {
    setIsAuthenticated(true);
    setUsername(username);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('username', username);
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar isAuthenticated={isAuthenticated} username={username} onLogout={handleLogout} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={
              isAuthenticated ? (
                <>
                  <section id="home">
                    <Home />
                  </section>
                  <section id="menu">
                    <Menu />
                  </section>
                  <section id="aboutus">
                    <Aboutus />
                  </section>
                  <section id="products">
                    <Product />
                  </section>
                  <section id="reviews">
                    <Reviews />
                  </section>
                </>
              ) : (
                <LoginRegister setIsAuthenticated={handleLogin} setUsername={setUsername} />
              )
            } />
            <Route path="/orderentry" element={<OrderEntry />} />
            <Route path="/login" element={<LoginRegister setIsAuthenticated={handleLogin} setUsername={setUsername} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
