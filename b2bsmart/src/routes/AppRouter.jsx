import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Cart from "../pages/Cart";

const Home = () => (
  <div className="bg-ghost-white min-h-screen flex items-center justify-center text-raisin-black">
    <h1 className="text-3xl font-bold">Bienvenido a B2BSmart</h1>
  </div>
);

const AppRouter = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/carrito" element={<Cart />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default AppRouter;
