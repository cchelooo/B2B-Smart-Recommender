const Cart = () => {
  const items = [
    { id: 1, name: "Producto A", price: 19.99, quantity: 2 },
    { id: 2, name: "Producto B", price: 49.5, quantity: 1 },
  ];

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <main className="bg-ghost-white min-h-screen p-6 text-raisin-black">
      <h2 className="text-3xl font-bold mb-6">Carrito de Compras</h2>
      <div className="bg-white rounded-xl shadow p-6 space-y-4">
        {items.map(item => (
          <div key={item.id} className="flex justify-between border-b border-silver pb-2">
            <div>
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-french-gray">Cantidad: {item.quantity}</p>
            </div>
            <span className="text-non-photo-blue font-medium">${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div className="flex justify-between pt-4 font-bold text-lg">
          <span>Total</span>
          <span className="text-non-photo-blue">${total.toFixed(2)}</span>
        </div>
        <button className="w-full bg-non-photo-blue text-white py-2 mt-4 rounded hover:bg-raisin-black transition">
          Finalizar Compra
        </button>
      </div>
    </main>
  );
};

export default Cart;
