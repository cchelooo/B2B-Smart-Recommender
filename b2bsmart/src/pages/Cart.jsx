import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [historial, setHistorial] = useState([]);
  const [recomendados, setRecomendados] = useState([]);
  const [checkoutFeedback, setCheckoutFeedback] = useState(null); // null | 'loading' | 'success'
  const [recomFeedback, setRecomFeedback] = useState(null); // null | 'loading' | 'success'
  const [deleteFeedback, setDeleteFeedback] = useState(null); // null | 'loading' | 'success'
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);
  const [loading, setLoading] = useState(true);

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

  const handleCheckout = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.id_user) {
      alert("Usuario no identificado");
      return;
    }

    setCheckoutFeedback("loading");

    try {
      for (const item of cartItems) {
        await fetch("http://localhost:5000/history/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id_user: user.id_user,
            id_product: item.id_product,
            quantity: item.quantity,
          }),
        });
      }

      setCartItems([]);
      localStorage.removeItem("cart");

      setTimeout(() => {
        setCheckoutFeedback("success");
        setTimeout(() => {
          setCheckoutFeedback(null);
          window.location.reload();
        }, 1000);
      }, 1000);
    } catch (error) {
      console.error("Error al guardar historial:", error);
      alert("Error al procesar la compra.");
      setCheckoutFeedback(null);
    }
  };

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.id_user) {
      fetch("http://localhost:5000/history/")
        .then((res) => res.json())
        .then((data) => {
          const comprasUsuario = data
            .filter((h) => h.client.id_user === user.id_user)
            .slice(-6)
            .map((h) => ({
              id_history: h.id_history,
              id_product: h.product.id_product,
              name: h.product.name,
              price: h.product.price,
              image:
                h.product.image && h.product.image !== ""
                  ? h.product.image
                  : "/placeholder.png",
            }));
          setHistorial(comprasUsuario);
        })
        .catch((err) => console.error("Error cargando historial:", err));
    }
  }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.id_user) {
      fetch(
        `http://localhost:5000/api/recomendacion/personalizadas/${user.id_user}`
      )
        .then((res) => res.json())
        .then((data) => {
          const recomendaciones = data.map((item) => ({
            id_product: item.id_product,
            name: item.name,
            price: item.price,
            image: item.image || "/placeholder.png",
          }));
          setRecomendados(recomendaciones);
        })
        .catch((err) => console.error("Error obteniendo recomendaciones:", err))
        .finally(() => setLoading(false)); // Aquí desactivas el loading
    } else {
      setLoading(false); // Si no hay usuario, igual apaga el loading
    }
  }, []);

  const handleAddToCart = (item) => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = storedCart.find(
      (p) => p.id_product === item.id_product
    );

    let updatedCart;
    if (existingItem) {
      updatedCart = storedCart.map((p) =>
        p.id_product === item.id_product
          ? { ...p, quantity: p.quantity + 1 }
          : p
      );
    } else {
      updatedCart = [...storedCart, { ...item, quantity: 1 }];
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);

    setRecomFeedback("loading");
    setTimeout(() => {
      setRecomFeedback("success");
      setTimeout(() => setRecomFeedback(null), 1000);
    }, 1000);
  };

  const handleRemoveFromHistory = (id_history) => {
    setPendingDeleteId(id_history);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!pendingDeleteId) return;

    setDeleteFeedback("loading");
    setShowDeleteModal(false);

    try {
      await fetch(`http://localhost:5000/history/${pendingDeleteId}`, {
        method: "DELETE",
      });

      setHistorial((prev) =>
        prev.filter((item) => item.id_history !== pendingDeleteId)
      );

      setTimeout(() => {
        setDeleteFeedback("success");
        setTimeout(() => setDeleteFeedback(null), 1000);
      }, 1000);
    } catch (err) {
      console.error("Error eliminando historial:", err);
      alert("Error al eliminar historial.");
      setDeleteFeedback(null);
    } finally {
      setPendingDeleteId(null);
    }
  };
  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="spinner"></div>{" "}
      </div>
    );
  }

  return (
    <main className="bg-white h-full p-6 text-raisin-black flex flex-col gap-6 mt-20">
      <section className="bg-ghost-white rounded-xl shadow p-6 h-1/2 flex flex-col gap-6">
        <div className="flex flex-1 gap-6">
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
                      src={
                        item.image && item.image !== ""
                          ? item.image
                          : "/placeholder.png"
                      }
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
                onClick={handleCheckout}
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

      <section className="h-1/2 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-ghost-white p-6 rounded-xl">
          <h3 className="text-lg font-bold mb-4 text-center">
            Historial de Compras
          </h3>
          <div className="flex gap-4 overflow-x-auto">
            {historial.map((item, index) => (
              <div
                key={index}
                className="min-w-[160px] bg-silver rounded-lg p-4 shadow-sm flex flex-col items-center justify-between text-center"
              >
                <div className="w-full h-32 bg-white rounded mb-2 flex items-center justify-center">
                  <img
                    src={item.image || "/placeholder.png"}
                    alt={item.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <p className="font-medium text-raisin-black text-sm truncate max-w-[120px]">
                  {item.name}
                </p>
                <p className="text-raisin-black text-sm font-bold mb-2">
                  ${parseInt(item.price).toLocaleString("es-CL")}
                </p>
                <div className="flex justify-between gap-2 w-full">
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="bg-ghost-white text-raisin-black text-xs px-2 py-1 rounded w-full"
                  >
                    Añadir
                  </button>
                  <button
                    onClick={() => handleRemoveFromHistory(item.id_history)}
                    className="bg-raisin-black text-white text-xs px-2 py-1 rounded w-full border border-french-gray"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-ghost-white p-6 rounded-xl">
          <h3 className="text-lg font-bold mb-4 text-center">
            Recomendaciones Personalizadas
          </h3>
          {recomendados.length > 0 ? (
            <div className="flex gap-4 overflow-x-auto">
              {recomendados.map((item, index) => (
                <div
                  key={index}
                  className="min-w-[160px] bg-silver rounded-lg p-4 shadow-sm flex flex-col items-center justify-between text-center"
                >
                  <div className="w-full h-32 bg-white rounded mb-2 flex items-center justify-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <p className="font-medium text-raisin-black text-sm truncate max-w-[120px]">
                    {item.name}
                  </p>
                  <p className="text-raisin-black text-sm font-bold mb-2">
                    ${parseInt(item.price).toLocaleString("es-CL")}
                  </p>
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="bg-raisin-black hover:bg-french-gray text-white text-xs px-2 py-1 rounded w-full"
                  >
                    Añadir al carrito
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-french-gray">
              No hay recomendaciones aún.
            </p>
          )}
        </div>
      </section>

      {checkoutFeedback && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-raisin-black text-white p-6 rounded-full flex items-center justify-center w-20 h-20">
            {checkoutFeedback === "loading" ? (
              <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <span className="text-3xl">🛒</span>
            )}
          </div>
        </div>
      )}

      {recomFeedback && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-raisin-black text-white p-6 rounded-full flex items-center justify-center w-20 h-20">
            {recomFeedback === "loading" ? (
              <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <span className="text-green-400 text-3xl">✔</span>
            )}
          </div>
        </div>
      )}

      {deleteFeedback && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-raisin-black text-white p-6 rounded-full flex items-center justify-center w-20 h-20">
            {deleteFeedback === "loading" ? (
              <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <span className="text-red-500 text-3xl">🗑️</span>
            )}
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-md text-center">
            <h2 className="text-lg font-bold mb-4 text-raisin-black">
              ¿Estás seguro de eliminar este producto del historial?
            </h2>
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setPendingDeleteId(null);
                }}
                className="px-4 py-2 rounded bg-silver hover:bg-french-gray text-raisin-black"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded bg-raisin-black text-white hover:bg-red-600"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Cart;
