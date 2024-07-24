import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Menu from "./components/Menu";
import Aboutus from "./components/Aboutus";
import Product from "./components/Product";
import Footer from "./components/Footer";
import Reviews from "./components/Reviews";

const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section id="home"> {/* Adjusted padding */}
          <Home />
        </section>
        <section id="menu" > {/* Adjusted padding */}
          <Menu />
        </section>
        <section id="aboutus" > {/* Adjusted padding */}
          <Aboutus />
        </section>
        <section id="products"> {/* Adjusted padding */}
          <Product />
        </section>
        <section id="reviews" > {/* Adjusted padding */}
          <Reviews />
        </section>
      </main>
      <Footer />
    </div>
  );
};
export default App;