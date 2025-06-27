import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Cart from "../pages/Cart";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";

const AppRouter = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/carrito" element={<CartWithLayout />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/login" element={<Login />} />
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
