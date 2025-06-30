import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const Navbar = () => {
  const [atTop, setAtTop] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
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

  const isHome = location.pathname === "/";
  const isTransparent = isHome && atTop;

  // Contador del carrito
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav
      className={`fixed top-0 z-50 w-full px-6 py-4 flex justify-between items-center transition-all duration-300 ${
        isTransparent
          ? "bg-transparent text-raisin-black"
          : "bg-raisin-black text-ghost-white shadow"
      }`}
    >
      {/* Menú ☰ y logo */}
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <span className="text-2xl">☰</span>
        <span className="font-bold text-lg hover:text-non-photo-blue transition">
          B2BSmart
        </span>
      </div>

      {/* Buscador */}
      <div className="w-1/2">
        <input
          type="text"
          placeholder="Buscar productos..."
          className="w-full px-4 py-2 rounded-lg border border-silver bg-white text-raisin-black focus:outline-none focus:ring-2 focus:ring-non-photo-blue"
        />
      </div>

      {/* Usuario y carrito */}
      <div className="flex items-center gap-4 relative">
        {user ? (
          <div className="flex items-center gap-3">
            {/* Nombre de usuario */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="font-semibold text-non-photo-blue"
            >
              👤 {user.name}
            </button>

            {/* Carrito */}
            <Link to="/carrito" className="hover:text-non-photo-blue text-lg">
              🛒({cartCount})
            </Link>

            {/* Menú desplegable */}
            {menuOpen && (
              <div className="absolute right-0 mt-10 bg-white text-raisin-black shadow-md rounded px-4 py-2">
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
