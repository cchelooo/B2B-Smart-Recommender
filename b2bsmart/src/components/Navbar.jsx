import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useUser } from "../context/UserContext";

const Navbar = () => {
  const [atTop, setAtTop] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useUser();

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

      <div className="flex items-center gap-8 relative">
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

        {user ? (
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="font-semibold text-non-photo-blue"
            >
              👤 {user.name}
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 bg-white text-raisin-black shadow-md rounded px-4 py-2">
                <button
                  onClick={logout}
                  className="hover:text-non-photo-blue transition"
                >
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        ) : (
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
        )}
      </div>
    </nav>
  );
};

export default Navbar;
