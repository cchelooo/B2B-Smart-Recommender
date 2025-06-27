import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [atTop, setAtTop] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setAtTop(window.scrollY === 0);
    };

    if (location.pathname === "/") {
      window.addEventListener("scroll", handleScroll);
      handleScroll();
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location.pathname]);

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

      <div className="flex items-center gap-8">
        {/* Links de navegación principales */}
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

        {/* Enlaces de autenticación */}
        <ul className="flex gap-4">
          <li>
            <Link to="/login" className="hover:text-non-photo-blue">
              Ingresar
            </Link>
          </li>
          <li>
            <Link to="/registro" className="hover:text-non-photo-blue">
              Crear cuenta
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
