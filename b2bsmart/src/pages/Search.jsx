import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getProducts } from "../services/productService";
import ProductModal from "../components/ProductModal";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Search = () => {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const location = useLocation();

  // Leer query desde URL (ej: /buscar?q=tecnologia)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const initialQuery = params.get("q") || "";
    setQuery(initialQuery.toLowerCase().trim());
  }, [location.search]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  useEffect(() => {
    const lowerQuery = query.toLowerCase().trim();

    const results = products.filter((p) => {
      const nameMatch = p.name.toLowerCase().includes(lowerQuery);
      const categoryMatch = p.category?.toLowerCase().includes(lowerQuery);
      return nameMatch || categoryMatch;
    });

    setFiltered(results);
  }, [query, products]);

  const handleAddToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const exists = cart.find((item) => item.id_product === product.id_product);
    if (exists) {
      alert("⚠️ Este producto ya está en el carrito.");
    } else {
      const updated = [...cart, { ...product, quantity: 1 }];
      localStorage.setItem("cart", JSON.stringify(updated));
      alert("✅ Producto añadido al carrito");
    }
  };

  return (
    <main className="min-h-screen bg-ghost-white p-6 pt-28 text-raisin-black">
      {query && (
        <h2 className="text-lg font-semibold mb-6">
          Productos con "<span className="text-french-gray">{query}</span>"
        </h2>
      )}

      {filtered.length === 0 && query.length > 0 ? (
        <p className="text-center text-french-gray">
          No se encontraron productos.
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((item) => (
            <div
              key={item.id_product}
              onClick={() => setSelectedProduct(item)}
              className="bg-silver rounded-lg p-4 shadow-sm flex flex-col items-center justify-center text-center cursor-pointer hover:shadow-md transition"
            >
              <div className="w-full h-44 rounded mb-2 flex items-center justify-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <p className="font-medium text-raisin-black text-sm truncate max-w-[120px]">
                {item.name}
              </p>
              <p className="text-raisin-black text-sm font-bold">
                ${parseInt(item.price).toLocaleString("es-CL")}
              </p>
              <button
                className="mt-2 bg-raisin-black text-white text-xs px-3 py-1 rounded hover:bg-french-gray hover:text-raisin-black transition"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart(item);
                }}
              >
                Añadir al carrito
              </button>
            </div>
          ))}
        </div>
      )}

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}
    </main>
  );
};

export default Search;
