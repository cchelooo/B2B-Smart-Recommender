import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import ProductCarousel from "../components/ProductCarousel";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  const removeFromCart = (id) => {
    const updatedCart = cartItems.filter((item) => item.id_product !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleQuantityChange = (id, quantity) => {
    const qty = Math.max(1, parseInt(quantity));
    const updatedCart = cartItems.map((item) =>
      item.id_product === id ? { ...item, quantity: qty } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const historial = Array.from({ length: 10 }, (_, i) => ({
    name: `Producto ${i + 1}`,
    price: (Math.random() * 100).toFixed(2),
  }));

  const recomendados = Array.from({ length: 6 }, (_, i) => ({
    name: `Sugerencia ${i + 1}`,
    price: (Math.random() * 100).toFixed(2),
  }));

  return (
    <main className="bg-white h-full p-6 text-raisin-black flex flex-col gap-6 mt-20">
      {/* Sección superior: carrito */}
      <section className="bg-ghost-white rounded-xl shadow p-6 h-1/2 flex flex-col gap-6">
        <div className="flex flex-1 gap-6">
          {/* Izquierda: Productos (70%) */}
          <div className="w-[70%] bg-silver rounded-lg p-4 overflow-y-auto space-y-4 max-h-[100%]">
            <div className="h-full max-h-[350px] overflow-y-auto pr-2">
              {cartItems.length === 0 ? (
                <p className="text-french-gray text-center">
                  Aún no hay productos en el carrito.
                </p>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item.id_product}
                    className="bg-white rounded-lg p-4 flex items-center justify-between w-full shadow-sm mb-2"
                  >
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(item.id_product, e.target.value)
                      }
                      className="w-12 text-center mr-4 border rounded"
                    />
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-contain mr-4"
                    />
                    <div className="flex-1">
                      <p className="font-semibold truncate max-w-[250px]">
                        {item.name}
                      </p>
                      <p className="text-sm text-french-gray">
                        {item.category}
                      </p>
                    </div>
                    <p className="font-bold text-non-photo-blue mr-4">
                      $
                      {(item.price * item.quantity).toLocaleString("es-CL", {
                        minimumFractionDigits: 0,
                      })}
                    </p>
                    <button
                      onClick={() => removeFromCart(item.id_product)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Derecha: Resumen (30%) */}
          <div className="w-[30%] bg-silver rounded-lg p-4 flex flex-col justify-between">
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-raisin-black text-center">
                Resumen de tu compra
              </h3>
              <div className="text-sm text-raisin-black">
                <p>
                  Monto total:{" "}
                  <span className="font-semibold">
                    $
                    {total.toLocaleString("es-CL", {
                      minimumFractionDigits: 0,
                    })}
                  </span>
                </p>
                <p>
                  Costo de envío: <span className="font-semibold">$0</span>
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-4">
              <button className="bg-non-photo-blue text-white py-2 rounded">
                Agregar más productos
              </button>
              <button
                className={`py-2 rounded text-white ${
                  cartItems.length > 0
                    ? "bg-raisin-black hover:bg-french-gray"
                    : "bg-raisin-black opacity-50 cursor-not-allowed"
                }`}
                disabled={cartItems.length === 0}
              >
                Continuar
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Carruseles abajo */}
      <section className="h-1/2 grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProductCarousel title="Historial de Compras" items={historial} />
        <ProductCarousel
          title="Recomendaciones Personalizadas"
          items={recomendados}
        />
      </section>
    </main>
  );
};

export default Cart;
