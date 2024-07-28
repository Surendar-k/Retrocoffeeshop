import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Menu from "./components/Menu";
import Aboutus from "./components/Aboutus";
import Product from "./components/Product";
import Footer from "./components/Footer";
import Reviews from "./components/Reviews";
import LoginRegister from "./components/Login/LoginRegister";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar isAuthenticated={isAuthenticated} username={username} />
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
                <LoginRegister setIsAuthenticated={setIsAuthenticated} setUsername={setUsername} />
              )
            } />
            <Route path="/login" element={<LoginRegister setIsAuthenticated={setIsAuthenticated} setUsername={setUsername} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
