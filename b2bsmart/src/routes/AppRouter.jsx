import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Cart from "../pages/Cart";
import Home from "../pages/Home";

const AppRouter = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/carrito" element={<CartWithLayout />} />
      </Routes>
      <Footer />
    </Router>
  );
};

// Layout con altura completa solo para carrito
const CartWithLayout = () => {
  return (
    <div className="flex flex-col h-screen">
      <Cart />
    </div>
  );
};

export default AppRouter;
