import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [atTop, setAtTop] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setAtTop(window.scrollY === 0);
    };

    // Solo escuchar scroll si estás en el home
    if (location.pathname === "/") {
      window.addEventListener("scroll", handleScroll);
      handleScroll(); // comprobar al cargar
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location.pathname]);

  // Aplicar transparencia solo en Home y cuando está arriba
  const isTransparent = location.pathname === "/" && atTop;

  return (
    <nav
      className={`sticky top-0 z-50 px-6 py-4 flex justify-between items-center shadow transition-all duration-300 ${
        isTransparent
          ? "bg-transparent text-raisin-black"
          : "bg-raisin-black text-ghost-white"
      }`}
    >
      <h1 className="text-xl font-bold">B2BSmart</h1>
      <ul className="flex gap-4">
        <li>
          <Link to="/" className="hover:text-non-photo-blue">
            Inicio
          </Link>
        </li>
        <li>
          <Link to="/carrito" className="hover:text-non-photo-blue">
            Carrito
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
