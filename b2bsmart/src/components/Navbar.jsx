import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-raisin-black text-ghost-white px-6 py-4 flex justify-between items-center shadow">
      <h1 className="text-xl font-bold">B2BSmart</h1>
      <ul className="flex gap-4">
        <li><Link to="/" className="hover:text-non-photo-blue">Inicio</Link></li>
        <li><Link to="/carrito" className="hover:text-non-photo-blue">Carrito</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
